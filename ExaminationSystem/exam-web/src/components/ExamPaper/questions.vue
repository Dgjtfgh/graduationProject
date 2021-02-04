<template>
    <div id="questions">
        <p>{{this.ques.id}}、{{this.ques.question}}</p>
        <el-input class="answer"
            type="textarea"
            :rows="5"
            placeholder="请输入你的解答"
            v-model="answer">
        </el-input>
    </div>
</template>
<script>
export default {
    props: {
        ques: Object
    },
    data () {
        return {
            answer: ''
        }
    }
}
</script>
<style lang="less" scoped>
#questions {
    margin: 30px;
    padding: 30px;
    min-width: 500px;
    min-height: 400px;
    p {
        text-align: left;
        margin-bottom: 30px;
    }
}
</style>