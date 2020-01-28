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
        .ivu-table .table-dark {
            background-color: #363636;
            color: #ffffff;
        }
        .ivu-table .table-warn-cell-confirm {
            background-color: #291d1d;
            color: #ff6600;
        }
        .ivu-table .table-tip-cell-confirm {
            background-color: #2e281a;
            color: #ffee00;
        }
        .ivu-table .table-heal-cell-confirm {
            background-color: #2e281a;
            color: #00ff00;
        }
    }
</style>
<template>
    <div class="index">
        <h2><a href="javascript:;" @click="handleStart">新型冠状病毒（2019-nCoV）发展势态数据实况监控中心</a></h2>
        <Table :columns="columns_ncov" :data="data_ncov" :loading="loading"></Table>
        <h5>叮云科技数据墙 提供技术支持</h5>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                loading: false,
                columns_ncov: [
                    {
                        title: '国家',
                        key: 'country',
                        filters: [
                            {
                                label: '中国',
                                value: '中国'
                            },
                            {
                                label: '美国',
                                value: '美国'
                            },
                            {
                                label: '日本',
                                value: '日本'
                            },
                            {
                                label: '法国',
                                value: '法国'
                            },
                            {
                                label: '澳大利亚',
                                value: '澳大利亚'
                            },
                            {
                                label: '新加坡',
                                value: '新加坡'
                            },
                            {
                                label: '韩国',
                                value: '韩国'
                            },
                            {
                                label: '越南',
                                value: '越南'
                            },
                            {
                                label: '马来西亚',
                                value: '马来西亚'
                            },
                            {
                                label: '德国',
                                value: '德国'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.country.indexOf(value) > -1;
                        },
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '地区',
                        key: 'area',
                        filters: [
                            {
                                label: '湖北',
                                value: '湖北'
                            },
                            {
                                label: '浙江',
                                value: '浙江'
                            },
                            {
                                label: '广东',
                                value: '广东'
                            },
                            {
                                label: '上海',
                                value: '上海'
                            },
                            {
                                label: '北京',
                                value: '北京'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.area.indexOf(value) > -1;
                        },
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '城市',
                        key: 'city',
                        filters: [
                            {
                                label: '武汉',
                                value: '武汉'
                            },
                            {
                                label: '杭州',
                                value: '杭州'
                            },
                            {
                                label: '绍兴',
                                value: '绍兴'
                            },
                            {
                                label: '宁波',
                                value: '宁波'
                            },
                            {
                                label: '温州',
                                value: '温州'
                            },
                            {
                                label: '嘉兴',
                                value: '嘉兴'
                            },
                            {
                                label: '直辖市外地输入',
                                value: '外地'
                            },
                            {
                                label: '深圳',
                                value: '深圳'
                            },
                            {
                                label: '广州',
                                value: '广州'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.city.indexOf(value) > -1;
                        },
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '确诊',
                        key: 'confirm',
                        sortable: true,
                        sortType: 'desc',
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '死亡',
                        key: 'dead',
                        sortable: true,
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '疑似',
                        key: 'suspect',
                        sortable: true,
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '康复',
                        key: 'heal',
                        sortable: true,
                        ellipsis: true,
                        tooltip: true
                    }
                ],
                data_ncov: [
                ]
            }
        },
        mounted () {
            window.vue = this;
            var that = this;
            that.$data.loading = true;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://2019ncov.blend.gateway.asia-guangdong.api.dscitech.com/', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        that.$data.data_ncov = data;
                        that.$data.loading = false;
                    } catch (e) {
                        that.$data.loading = false;
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
            handleStart () {
                this.$data.data_ncov = [];
                var that = this;
                this.$Modal.confirm({
                    title: '数据重载提示',
                    content: '视图已被清空，是否重新拉取最新数据。',
                    closeable: false,
                    onOk: () => {
                        that.$data.loading = true;
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', 'https://2019ncov.blend.gateway.asia-guangdong.api.dscitech.com/', true);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                try {
                                    var data = JSON.parse(xhr.responseText);
                                    that.$data.data_ncov = data;
                                    that.$data.loading = false;
                                } catch (e) {
                                    that.$data.loading = false;
                                    that.$Modal.warning({
                                        title: '【系统异常】糟糕，翻车了',
                                        content: e.message
                                    })
                                }
                            }
                        }
                        xhr.send();
                    }
                });
            }
        }
    }
</script>
