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
                    <p>404 Not Found</p>
                </h2>
                <h5>叮云科技数据墙 提供技术支持</h5>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
    }
</script>
