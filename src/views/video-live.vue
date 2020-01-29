<template>
    <div class="index">
        <video autoplay="autoplay" controls="controls" ref="my_video_player" style="width: 100%; height: 100%" />
    </div>
</template>
<script>
    export default {
        mounted () {
            const loading_msg = this.$Message.loading({
                content: '正在获取直播数据源，请稍事等待',
                duration: 0
            });
            var that = this
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://2019ncov.blend.gateway.asia-guangdong.api.dscitech.com/?name=cctv_live_video', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    setTimeout(loading_msg, 800);
                    try {
                        var data = JSON.parse(xhr.responseText);
                        that.$refs.my_video_player.src = data.source;
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
    }
</script>