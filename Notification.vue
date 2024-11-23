<template>
    <div>
        <div v-if="newNotifications > 0" class="notification-icon">
            <span class="notification-count">{{ newNotifications }}</span>
            <i class="fas fa-bell"></i>
        </div>
    </div>
</template>

<script>
import { HubConnectionBuilder } from '@microsoft/signalr';

export default {
  data() {
    return {
      newNotifications: 0,
      connection: null,
    };
  },
  mounted() {
    this.startSignalRConnection();
  },
  methods: {
    async startSignalRConnection() {
      this.connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/notificationHub')  // URL to your SignalR hub
        .build();

      this.connection.on('ReceiveNotification', (message) => {
        this.newNotifications += 1;  // Increase notification count
        this.showGlowingIndicator();
      });

      try {
        await this.connection.start();
        console.log('SignalR connection established');
      } catch (error) {
        console.error('SignalR connection error:', error);
      }
    },
    showGlowingIndicator() {
      const icon = document.querySelector('.notification-icon');
      if (icon) {
        icon.classList.add('glow');
        setTimeout(() => {
          icon.classList.remove('glow');
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
    .notification-icon {
        position: relative;
        font-size: 24px;
        cursor: pointer;
    }

    .notification-count {
        position: absolute;
        top: -5px;
        right: -10px;
        background-color: red;
        color: white;
        font-size: 12px;
        border-radius: 50%;
        padding: 5px;
    }

    .notification-icon.glow {
        animation: glow 1s ease-in-out infinite;
    }

    @keyframes glow {
        0% {
            box-shadow: 0 0 5px red, 0 0 10px red;
        }

        50% {
            box-shadow: 0 0 20px red, 0 0 30px red;
        }

        100% {
            box-shadow: 0 0 5px red, 0 0 10px red;
        }
    }
</style>
