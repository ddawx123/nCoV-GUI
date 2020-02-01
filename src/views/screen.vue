<style lang="less">
    .screen {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }
</style>
<template>
    <div class="screen">
        <h2 style="text-align: center">新型冠状病毒（2019-nCoV）发展势态数据实况监控中心</h2>
        <Divider dashed />
        <Alert style="font-size: 10px; padding: unset" type="error">中国疫情实况</Alert>
        <Row>
            <Alert style="float: left; font-size: 10px; padding: unset; width: 25%" type="error">确诊{{chinaTotal.confirm}}例</Alert>
            <Alert style="float: left; font-size: 10px; padding: unset; width: 25%" type="warning">疑似{{chinaTotal.suspect}}例</Alert>
            <Alert style="float: left; font-size: 10px; padding: unset; width: 25%" type="success">治愈{{chinaTotal.heal}}例</Alert>
            <Alert style="float: left; font-size: 10px; padding: unset; width: 25%">死亡{{chinaTotal.dead}}例</Alert>
        </Row>
        <Row>
            <Col span="8">
                <Select v-model="countrySelected" filterable @on-change="pullCountryDetail">
                    <Option v-for="(v,k,i) in globalData" :value="k" :key="i">{{ v.name }}</Option>
                </Select>
            </Col>
            <Col span="8">
                <Select v-model="provinceSelected" filterable multiple @on-change="pullProvinceDetail">
                    <Option v-for="(v,k,i) in provinceData" :value="k" :key="i">{{ v.name }}</Option>
                </Select>
            </Col>
            <Col span="8">
                <Select v-model="citySelected" filterable multiple @on-change="pullCityDetail">
                    <Option v-for="(v,k,i) in cityData" :value="v.name" :key="i">{{ v.name }}</Option>
                </Select>
            </Col>
        </Row>
        <Divider dashed />
        <Row>
            <Col v-for="(v,k,i) in nCoV_Cards" :key="i" span="8">
                <Card>
                    <p slot="title">{{ v.name }} 实时疫情信息</p>
                    <p>累计确诊：<span style="color: #f00; font-size: 18px; font-weight: bold">{{ v.total.confirm }}</span>例 较昨日新增：<span style="color: #f00; font-size: 18px; font-weight: bold">{{ v.total.confirm - (v.total.confirm - v.today.confirm) }}</span>例</p>
                    <p>已治愈：<span style="color: #0b0; font-size: 18px; font-weight: bold">{{ v.total.heal }}</span>例 死亡：<span style="color: #00f; font-size: 18px; font-weight: bold">{{ v.total.dead }}</span>例</p>
                </Card>
            </Col>
        </Row>
        <!--<Table :columns="columns_ncov" :data="data_ncov" :loading="loading"></Table>-->
        <Divider />
        <h5 style="text-align: center">叮云科技数据墙 提供技术支持</h5>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                loading: false,
                columns_ncov: [
                    {
                        title: '确诊',
                        key: 'confirm'
                    },
                    {
                        title: '死亡',
                        key: 'dead'
                    },
                    {
                        title: '疑似',
                        key: 'suspect'
                    },
                    {
                        title: '康复',
                        key: 'heal'
                    }
                ],
                countrySelected: null,
                provinceSelected: null,
                citySelected: null,
                chinaTotal: {},
                globalData: [],
                provinceData: [],
                cityData: [],
                nCoV_Cards: []
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
                        that.$data.globalData = data.areaTree;
                        that.$data.chinaTotal = data.chinaTotal;
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
                console.log('no implement')
            },
            pullCountryDetail () { //全球数据抽取
                if (this.$data.globalData[this.countrySelected].name == '中国') {
                    this.$Notice.open({
                        title: this.$data.globalData[this.countrySelected].name + '疫情实况',
                        desc: '全国确诊：' + this.$data.globalData[this.countrySelected].total.confirm + '，\
                            较昨日新增：' + (this.$data.globalData[this.countrySelected].total.confirm - (this.$data.globalData[this.countrySelected].total.confirm - this.$data.globalData[this.countrySelected].today.confirm)) + '\
                            <br>疑似病例：' + this.$data.chinaTotal.suspect + '，\
                            治愈人数：' + this.$data.chinaTotal.heal + '<br>死亡人数：' + this.$data.chinaTotal.dead,
                        duration: 0
                    });
                } else {
                    this.$Notice.open({
                        title: this.$data.globalData[this.countrySelected].name + '疫情实况',
                        desc: '全国确诊：' + this.$data.globalData[this.countrySelected].total.confirm + '，\
                            较昨日新增：' + (this.$data.globalData[this.countrySelected].total.confirm - (this.$data.globalData[this.countrySelected].total.confirm - this.$data.globalData[this.countrySelected].today.confirm)),
                        duration: 0
                    });
                }
                this.$data.provinceData = this.$data.globalData[this.countrySelected].children;
                this.$data.cityData = [];
                this.provinceSelected = null;
                this.citySelected = null;
            },
            pullProvinceDetail () { //省级数据抽取
                this.$data.cityData = [];
                if (this.provinceSelected == 1) {
                    let cities = this.$data.globalData[this.countrySelected].children[this.provinceSelected].children;
                    cities.forEach ((v,k) => {
                        this.$data.cityData.push(v);
                    });
                } else {
                    this.provinceSelected.forEach((v,k) => {
                        let cities = this.$data.globalData[this.countrySelected].children[v].children;
                        cities.forEach ((v,k) => {
                            this.$data.cityData.push(v);
                        });
                    });
                }
            },
            pullCityDetail () { //市级数据抽取
                this.$data.nCoV_Cards = [];
                this.citySelected.forEach((v,k) => {
                    this.$data.cityData.forEach((_v,_k) => {
                        if (_v.name == v) this.$data.nCoV_Cards.push(_v);
                    });
                });
            }
        }
    }
</script>
