<template lang='pug'>
modal#SendMeNow(popupID='SMN')
    .card
        .card-header: .is-bold SendMeNow Summer Missionaries
        .card-content: article.media(v-for= 'person in people')
            .media-left
                p.image.is-64x64: img(:src='person.icon' alt='picture')
            .media-content
                .content
                    strong {{person.name}}: #[small {{person.mission}}]
                    p {{person.description}}
            .media-right
</template>

<script>
import people from '@/missionaries'
import modal from '@/components/modal'
export default {
  name: 'missionaries',
  props: ['popup'],
  data () {
    return {people}
  },
  components: {modal}
}
</script>

<style>
#SendMeNow .modal-content{
    width: 800px;
    height:500px;
    overflow-y: auto;
}
#SendMeNow .media:nth-child(even){
    background: rgb(233, 233, 233);
}
#SendMeNow .media{
    padding: 1em;
}
#SendMeNow .media .image{
    border-radius: 50%;
    background: pink;
    overflow: hidden;
}
#SendMeNow .card-header .is-bold{
    font-size: 1.5em;
    margin: 5px auto;
}
</style>
