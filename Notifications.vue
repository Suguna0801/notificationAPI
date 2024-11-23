<template>
    <div class="notification">
        <h1>Real-Time Notifications</h1>
        <div v-if="notifications.length > 0">
            
            <ul>
                <li v-for="(notification, index) in notifications" :key="index">
                    {{ notification }}
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No notifications received yet.</p>
        </div>
    </div>
</template>

<script>
    import * as signalR from '@microsoft/signalr';

    export default {
        name: 'Notification',
        data() {
            return {
                notifications: [],
            };
        },
        mounted() {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('http://localhost:5000/notificationHub')
                .configureLogging(signalR.LogLevel.Information)
                .build();

            connection.on('ReceiveNotification', (message) => {
                this.notifications.push(message);
            });

            connection
                .start()
                .then(() => console.log('SignalR connected.'))
                .catch((err) => console.error('SignalR connection error:', err));
        },
    };
</script>

<style scoped>
    .notification {
        text-align: center;
        margin: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        background-color: #f8f9fa;
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>
