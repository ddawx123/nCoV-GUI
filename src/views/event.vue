<style lang="less">
    .index {
        background-color: #363636;
        color: #ffffff;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            text-align: center;
            img{
                height: 100%;
            }
        }
        h2{
            color: #ffffff;
            margin-bottom: 10px;
            text-align: center;
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
        .ivu-table .no-visiable {
            display: none;
        }
    }
</style>
<template>
    <div class="index">
        <h2>新型冠状病毒（2019-nCoV）发展势态数据实况监控中心</h2>
        <Table :columns="columns_ncov" :data="data_ncov" :loading="loading"></Table>
        <h5>叮云科技数据墙 提供技术支持</h5>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                loading: true,
                columns_ncov: [
                    {
                        title: '时间',
                        key: 'time',
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '标题',
                        key: 'title',
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '详情',
                        key: 'desc',
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '来源',
                        key: 'source',
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '创建',
                        key: 'create_time',
                        sortable: true,
                        sortType: 'desc',
                        className: 'no-visiable'
                    }
                ],
                data_ncov: [
                ]
            }
        },
        mounted () {
            var that = this
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://2019ncov.blend.gateway.asia-guangdong.api.dscitech.com/?name=wuwei_ww_time_line', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        that.$data.data_ncov = data;
                        that.$data.loading = false;
                    } catch (e) {
                        that.$Modal.warning({
                            title: '【系统异常】糟糕，翻车了',
                            content: e.message
                        })
                    }
                }
            }
            xhr.send();
        },
        methods: {
        }
    }
</script>
