<style lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #ffffff;
            margin-bottom: 10px;
            p{
                margin: 0 0 50px;
            }
        }
        h5{
            color: #ffffff;
            margin-bottom: 10px;
            text-align: center;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h1>
                    <img src="../images/logo.png">
                </h1>
                <h2>
                    <p>2019新型冠状病毒实况监控中心</p>
                    <Button @click="handleMonitor" type="warning" shape="circle" ghost>进入发展势态表》</Button>
                    <Button @click="handleEvent" type="info" shape="circle" ghost>进入事件跟踪表》</Button>
                    <Button @click="handleVideo" type="error" shape="circle" ghost>武汉此时此刻（医院施工现场实时画面）</Button>
                    <Button @click="handleTg" type="primary" shape="circle">电报信息实况</Button>
                </h2>
                <h5>叮云科技数据墙 提供技术支持</h5>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        methods: {
            handleMonitor () {
                this.$router.push({
                    path: '/screen'
                })
            },
            handleEvent () {
                this.$router.push({
                    path: '/event'
                })
            },
            handleVideo () {
                this.$router.push({
                    path: '/cctv-live-video'
                })
            },
            handleTg () {
                this.$router.push({
                    path: '/tg-channel'
                })
            }
        }
    }
</script>
