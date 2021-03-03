<template>
    <div id="questions">
        <p>{{this.ques.id}}、{{this.ques.content}}</p>
        <p style="text-indent: 2em;">{{this.ques.select}}</p>
        <el-input class="answer"
            type="textarea"
            :rows="5"
            placeholder="请输入你的解答"
            v-model="s1"
            @input="change"
        >
        </el-input>
    </div>
</template>
<script>
export default {
    props: {
        ques: Object,
        answer: String
    },
    data () {
        return {
            s1: ''
        }
    },
    created() {
        // this.s1 = this.answer;
    },
    watch: {
        // s1: function () {
        //     this.$emit("changeanswer", this.s1);
        // },
        // answer: function () {
        //     this.s1 = this.answer;
        //     console.log(this.s1, '++++');
        // }
    },
    methods: {
        change(value) {
            this.$emit("changeanswer", value);
        },
        setanswer(value) {
            this.s1 = value;
        }
    }
}
</script>
<style lang="less" scoped>
#questions {
    // margin: 10px;
    padding: 30px;
    box-sizing: border-box;
    max-height: 600px;
    min-width: 500px;
    min-height: 450px;
    p {
        text-align: left;
        margin-bottom: 10px;
    }
}
</style>