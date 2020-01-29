<template>
    <div>
        
        <Card v-for="item in data" :key="item.title">
            <p slot="title" v-if="filterMessage(item.title)">{{item.title}}</p>
            <p v-html="removeBrTag(item.content)"></p>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                data: [],
                timer: null,
                canUpdate: true
            }
        },
        methods: {
            filterMessage(title) {
                return !/^pinned/.test(title.trim());
            },
            removeBrTag (html) {
                if (/<br><br>$/.test(html)) {
                    return html.replace(/<br><br>$/, '');
                }
                return html;
            },
            blend_substr (str, n) { 
                var r = /[^\x00-\xff]/g; 
                if (str.replace(r, "mm").length <= n) return str;
                var m = Math.floor(n / 2); 
                for (var i = m; i < str.length; i++) {
                    if (str.substr(0,i).replace(r, "mm").length >= n) {
                        return str.substr(0, i) + "...";
                    }
                }
                return str;
            },
            getData () {
                this.$data.canUpdate = false;
                const loading_msg = this.$Message.loading({
                    content: '正在获取数据，请稍事等待',
                    duration: 0
                });
                var that = this
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://2019ncov.blend.gateway.asia-guangdong.api.dscitech.com/?name=tg-channel&rnd=' + btoa(Math.random()) + '&client_time=' + new Date().getTime(), true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        that.$data.canUpdate = true;
                        setTimeout(loading_msg, 800);
                        try {
                            var data = JSON.parse(xhr.responseText);
                            that.$data.data = data.entry;
                        } catch (e) {
                            that.$Modal.warning({
                                title: '【系统异常】糟糕，翻车了',
                                content: e.message
                            })
                        }
                    }
                }
                xhr.send();
            }
        },
        mounted () {
            this.getData();
            this.$data.timer = window.setInterval(() => {
                if (!this.$data.canUpdate) return;
                this.$data.canUpdate = false;
                const loading_msg2 = this.$Message.loading({
                    content: '正在获取数据，请稍事等待',
                    duration: 0
                });
                var that = this
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://2019ncov.blend.gateway.asia-guangdong.api.dscitech.com/?name=tg-channel&rnd=' + btoa(Math.random()) + '&client_time=' + new Date().getTime(), true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        that.$data.canUpdate = true;
                        setTimeout(loading_msg2, 800);
                        try {
                            var data = JSON.parse(xhr.responseText);
                            that.$data.data = data.entry;
                        } catch (e) {
                            window.clearInterval(timer);
                            that.$Modal.warning({
                                title: '【系统异常】糟糕，翻车了',
                                content: e.message
                            })
                        }
                    }
                }
                xhr.send();
            }, 30000);
        },
        beforeRouteLeave(to, form, next) {
            window.clearInterval(this.$data.timer);
            console.log('timer closed.');
            if (!this.$data.canUpdate) {
                window.location.hash = form.fullPath;
                this.$Modal.warning({
                    title: '数据仍在加载',
                    content: '我们抱歉的通知您，由于数据仍处于加载状态，页面暂时无法完成切换。请等候本次数据加载完成后再次切换页面，由此给您带来的不便敬请谅解！'
                })
            } else {
                next();
            }
        }
    }
</script>