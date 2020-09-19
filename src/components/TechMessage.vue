<template>
    <div class="class new-message">
        <form @submit.prevent="addMessage">
            <label for="new-message">New Message(enter to add):</label>
            <input type="text" name="new-message" v-model="newMessage">
            <p class="red-text" v-if="feedback">{{feedback}}</p>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'


export default {
    name: 'TechMessage',
    props: ['name'],
    data(){
        return {
            newMessage: null,
            feedback: null,
            isOnline:null
        }
    },
    methods: {
        addMessage(){
            if(this.newMessage){
                db.collection('tech-messages').add({
                    content: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newMessage = null
                this.feedback = null
            }else {
                this.feedback ='You must enter a message'
            }
        },
     
        }
       
    }

</script>