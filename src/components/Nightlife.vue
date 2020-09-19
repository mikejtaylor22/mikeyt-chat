<template>
     <div class="chat container">
        <h2 class="center black-text">&reg;Chat by MikeyT</h2>
        <h5 class="center black-text">Nightlife Room</h5>
        <div class="card">
            <div class="card-container">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="black-text">{{message.name}}</span>
                        <span class="grey-text text-darken-3">{{message.content}}</span>
                        <span class="grey-text time">{{message.timestamp}}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NightMessage :name="name" />
                
            </div>
        </div>
        <div class="online">
            <!-- <p>users online: </p>
            <span class="teal-text" v-for="(online,index) in onlineUsers" :key="index">{{online}} </span> -->
            <label for="text">Username: </label>
            <span class="black-text smalluser">{{this.name}}</span>
            </div>
            <div class="rooms">
                <button type="submit" class="btn teal" @click="changeToGeneral">General Room</button>
                <button type="submit" class="btn blue" @click="changeToTech">Technology Room</button>
                <button type="submit" class="btn red" @click="changeToEnt">Entertainment Room</button>
            </div>
    </div>
</template>

<script>
// import TechMessage from '@/components/TechMessage'
// import EntMessage from '@/components/EntMessage'
import NightMessage from '@/components/NightMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Nightlife',
  props: ['name'],
    components:{
        NightMessage
    },
  data () {
    return {
     messages: []
    }
  },
  methods: {
      changeToGeneral(){
          this.$router.push({name: 'Chat', params: {name: this.name}})
      },
        changeToTech(){
          this.$router.push({name: 'Technology', params: {name: this.name}})
      },
      changeToEnt(){
          this.$router.push({name: 'Entertainment', params: {name: this.name}})
      }
  },
  created(){
    let ref = db.collection('night-messages').orderBy('timestamp')

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
        })
  }
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