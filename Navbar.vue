<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <!-- Add more links as needed -->
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar'
    };
</script>

<style scoped>
    nav {
        background-color: #333;
        color: white;
        padding: 10px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: inline;
        margin: 0 10px;
    }

    a {
        color: white;
        text-decoration: none;
    }

        a:hover {
            text-decoration: underline;
        }
</style>
