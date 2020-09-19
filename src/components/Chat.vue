<template>
    <div class="chat container">
        <h2 class="center teal-text">&reg;Chat by MikeyT</h2>
        <h5 class="teal-text center">General Chat</h5>
        <div class="card">
            <div class="card-container">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="teal-text">{{message.name}}</span>
                        <span class="grey-text text-darken-3">{{message.content}}</span>
                        <span class="grey-text time">{{message.timestamp}}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name="name" />
                
            </div>
        </div>
        <div class="online">
            <!-- <p>users online: </p>
            <span class="teal-text" v-for="(online,index) in onlineUsers" :key="index">{{online}} </span> -->
            <label for="text">Username: </label>
            <span class="teal-text smalluser">{{this.name}}</span>
            </div>
            <div class="rooms">
                <button type="submit" class="btn blue" @click="changeToTech">Technology Room</button>
                 <button type="submit" class="btn red" @click="changeToEnt">Entertainment Room</button>
                 <button type="submit" class="btn black" @click="changeToNight">Nightlife Room</button>
            </div>
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
    name:'Chat',
    props: ['name'],
    components: {
        NewMessage
    },
    data(){
        return {
            messages: [],
            onlineUsers: [],
            
            
        }
        
    },
    methods: {
        changeToTech(){
            this.$router.push({name: 'Technology', params: {name: this.name}})
            
        },
        changeToEnt(){
            this.$router.push({name: 'Entertainment', params: {name: this.name}})
        },
        changeToNight(){
            this.$router.push({name: 'Nightlife', params: {name: this.name}})
        }
    },
    created(){

           db.collection('user-records').add({
            username: this.name,
            time: moment().format('lll')
            
        })

         db.collection('online-users').get()
         .then(snapshot => {
             snapshot.forEach(user => {
                 let userNames = user.data()
                 this.onlineUsers.push(userNames.username)
                  
             })
           
         })
        
       
        let ref = db.collection('messages').orderBy('timestamp')

        ref.onSnapshot(snapshot => {
           snapshot.docChanges().forEach(change => {
               if(change.type == 'added'){
                   let doc = change.doc
                   this.messages.push({id: doc.id, 
                   name: doc.data().name, 
                   content: doc.data().content, 
                   timestamp: moment(doc.data().timestamp).format('lll')
                   })
               }
           })
        }
        )
    }
    ,
    // destroyed() {
        
       
    //     db.collection('online-users').get()
    //     .then(res => {
    //         res.forEach(element =>{
    //             element.ref.delete()
    //         })
            
    //         this.onlineUsers = []
    //     },

       
    //     )}
        
        
}
</script>

<style>
.chat h2{
font-size: 2.6em;
margin-bottom:40px;
}

.chat span {
    font-size: 1.3em;
}

.chat .time{
    display: block;
    font-size: .8em;
}

.messages{
    max-height: 500px;
    overflow: auto;
    border:thin;
}

.messages::-webkit-scrollbar{
    width: 3px;
}

.messages::-webkit-scrollbar-track{
    background: #ddd;
}
.messages::-webkit-scrollbar-thumb{
    background: #aaa;
}
.smalluser {
    font-size: 1px;
}

.rooms{
    padding: 20px 0 0 0;
}
</style>