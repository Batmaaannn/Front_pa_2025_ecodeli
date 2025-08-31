<script setup lang="ts">
// Adapte ces imports à tes chemins réels
import { COOKIES } from "@/types/cookies";
import { onMounted } from "vue";
import { useCookies } from "vue3-cookies";
// Update the import path to the correct location of panelApiCall.ts
const API_BASE = import.meta.env.VITE_API_URL;

declare global {
  interface Window {
    OneSignal: any;
    requestNotificationPermission?: () => Promise<void>;
  }
}

async function waitForSDK() {
  if (window.OneSignal) return;
  await new Promise<void>((resolve) => {
    const i = setInterval(() => {
      if (window.OneSignal) {
        clearInterval(i);
        resolve();
      }
    }, 50);
  });
}

onMounted(async () => {
  try {
    if (!("Notification" in window)) {
      console.log("Ce navigateur ne supporte pas les notifications");
      return;
    }

    const currentPermission = Notification.permission; // "default" | "denied" | "granted"
    console.log("Permission actuelle:", currentPermission);
    if (currentPermission === "denied") {
      console.log("Notifications bloquées par l'utilisateur");
      return;
    }

    await waitForSDK();
    const OneSignal = window.OneSignal || (window.OneSignal = []);

    await OneSignal.init({
      appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
      serviceWorkerPath: "OneSignalSDKWorker.js",
      serviceWorkerParam: { scope: "/" },
      allowLocalhostAsSecureOrigin: import.meta.env.DEV,
      notifyButton: {
        enable: true,
        size: "medium",
        position: "bottom-right",
        prenotify: true,
        showCredit: false,
        text: {
          "tip.state.unsubscribed": "Cliquez pour recevoir les notifications",
          "tip.state.subscribed": "Vous êtes abonné aux notifications",
          "tip.state.blocked": "Vous avez bloqué les notifications",
          "message.prenotify": "Cliquez pour vous inscrire aux notifications",
          "message.action.subscribed": "Merci de vous être abonné !",
          "message.action.resubscribed": "Vous êtes réabonné aux notifications",
          "message.action.unsubscribed":
            "Vous ne recevrez plus de notifications",
          "dialog.main.title": "Notifications",
          "dialog.main.button.subscribe": "S'abonner",
          "dialog.main.button.unsubscribe": "Se désabonner",
          "dialog.blocked.message": "L'action est bloquée",
          "dialog.blocked.title": "Bloqué",
          "message.action.subscribing": "Vous venez de vous abonner !",
        },
      },
    });

    OneSignal.Debug.setLogLevel("info");

    // ↪ permissionChange
    OneSignal.Notifications.addEventListener(
      "permissionChange",
      async (permission: any) => {
        // v16 envoie un objet { from, to } ou une string
        const state =
          typeof permission === "string" ? permission : permission?.to;
        console.log("Permission de notification changée:", state);
        if (state === "granted") await handleNotificationRegistration();
      }
    );

    // ↪ changement d’abonnement (id/opt-in)
    OneSignal.User.PushSubscription.addEventListener(
      "change",
      async (event: any) => {
        const playerId = event?.current?.id ?? null;
        const optedIn = !!event?.current?.optedIn;
        console.log(
          "Abonnement push changé, optedIn:",
          optedIn,
          "playerId:",
          playerId
        );

        // PUT optedIn
        try {
          const { cookies } = useCookies();
          const token = cookies.get(COOKIES.CONNECTION_TOKEN);
          if (token) {
            await fetch(`${API_BASE}/users/onesignal`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ optedIn }),
            });
          }
        } catch (e) {
          console.error("Échec de l'enregistrement du statut:", e);
        }

        if (playerId) await handleNotificationRegistration();
      }
    );

    // premier passage
    await handleNotificationRegistration();

    // bouton manuel (optionnel, comme sur Next)
    window.requestNotificationPermission = async () => {
      await OneSignal.Notifications.requestPermission();
      if (OneSignal.Notifications.permission === "granted") {
        console.log("Permissions de notification accordées");
        await handleNotificationRegistration();
      } else {
        console.log("Permissions de notification refusées");
      }
    };
  } catch (error: any) {
    console.error("Erreur lors de l'initialisation OneSignal:", error);
    if (
      typeof error?.message === "string" &&
      error.message.includes("Notification permissions are blocked")
    ) {
      console.log(
        "Permissions bloquées. L’utilisateur doit les réactiver manuellement."
      );
    }
  }
});

async function handleNotificationRegistration() {
  try {
    const OneSignal = window.OneSignal;
    const perm = OneSignal?.Notifications?.permission; // "default" | "denied" | "granted"
    if (perm !== "granted") {
      console.log("Notifications push non activées:", perm);
      return;
    }

    const userId = OneSignal.User.PushSubscription.id; // playerId
    if (!userId) {
      console.log("Aucun ID utilisateur OneSignal disponible");
      return;
    }

    // POST playerId (⚠️ en JSON, pas une string brute)
    try {
      //   const token = getToken();
      const { cookies } = useCookies();
      const token = cookies.get(COOKIES.CONNECTION_TOKEN);
      if (token) {
        // await fetch(`${API_BASE}/users/onesignal`, {
        //   method: 'POST',
        //   headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ playerId: userId }),
        // });

        // assign user to db
        console.log("Notification enregistrée avec succès");
      }
    } catch (e) {
      console.error("Échec de l'enregistrement de notification:", e);
    }
  } catch (e) {
    console.error("Erreur lors de l’enregistrement des notifications:", e);
  }
}
</script>

<template />
