<template>
    <div id="jieshao" class="jiehsao" style="display: block;margin-top: 100px;">

        <div style="width: 1200px;margin:50px auto;">
            <div class="col-xs-4" style="width: 400px;height: 220px;position: relative;overflow:hidden;">
                <div style="width: 400px;height: 300px;padding-top: 20px;" class="shang" v-show="show1" @mouseenter="show1=false">
                    <p style="text-align: center;"><img src="../assets/zhineng.png" style="width: 120px;height:100px;"></p>
                    <p style="text-align: center;margin-top: 20px;font-size: 24px;color: #333;font-family: 微软雅黑;">智能</p>
                </div>
                <div style="width: 400px;height: 220px;background-color: #eee;padding-top: 30px;" class="xia" @mouseleave="show1=true">
                    <p style="text-align: center;"><img src="../assets/zhineng_icon.png" style="display: inline-block;margin-right: 20px;"><span style="color: white;font-size: 24px;vertical-align: middle;">智能</span></p>
                    <p style="width: 300px;margin-left: 50px;font-family: 新宋体;color: #666;font-size: 14px;line-height: 25px;margin-top: 20px;text-align: center;">运用最新AI技术，<br>智能解读电影/电视剧剧本<br>智能生成Excel表格<br>帮您实现剧组云管理 </p>
                </div>
            </div>
            <!-- 智能板块结束 -->
            <div class="col-xs-4" style="width: 400px;height: 220px;position: relative;overflow:hidden;">
                <div style="width: 400px;height: 220px;padding-top: 20px;" class="shang" v-show="show2" @mouseenter="show2=false">
                    <p style="text-align: center;"><img src="../assets/gaoxiao.png" style="width: 100px;height:100px;"></p>
                    <p style="text-align: center;margin-top: 20px;font-size: 24px;color: #333;font-family: 微软雅黑;">高效</p>
                </div>
                <div style="width: 400px;height: 220px;background-color: #eee;padding-top: 30px;" class="xia" @mouseleave="show2=true">
                    <p style="text-align: center;"><img src="../assets/gaoxiao_icon.png" style="display: inline-block;margin-right: 20px;"><span style="color: white;font-size: 24px;vertical-align: middle;">高效</span></p>
                    <p style="width: 300px;margin-left: 50px;font-family: 新宋体;color: #666;font-size: 14px;line-height: 25px;margin-top: 20px;text-align: center;">平均为您减轻80%的工作强度<br>节省70%的工作时间<br>您可以用这些时间<br>泡妞，撩汉，赚更多的钱</p>
                </div>
            </div>
            <!-- 高效板块结束 -->
            <div class="col-xs-4" style="width: 400px;height: 220px;position: relative;overflow:hidden;">
                <div style="width: 400px;height: 220px;padding-top: 20px;" class="shang" v-show="show3" @mouseenter="show3=false">
                    <p style="text-align: center;"><img src="../assets/zhuanye.png" style="width: 100px;height:100px;"></p>
                    <p style="text-align: center;margin-top: 20px;font-size: 24px;color: #333;font-family: 微软雅黑;">专业</p>
                </div>
                <div style="width: 400px;height: 220px;background-color: #eee;padding-top: 30px;" class="xia" @mouseleave="show3=true">
                    <p style="text-align: center;"><img src="../assets/zhuanye_icon.png" style="display: inline-block;margin-right: 20px;"><span style="color: white;font-size: 24px;vertical-align: middle;">专业</span></p>
                    <p style="width: 300px;margin-left: 50px;font-family: 新宋体;color: #666;font-size: 14px;line-height: 25px;margin-top: 20px;text-align: center;">资深影视统筹指导设计<br>拥有十余载影视统筹经验<br>适用于大陆剧本格式</p>
                </div>
            </div>
            <!-- 专业板块结束 -->
            <div class="col-xs-4" style="width: 400px;height: 220px;position: relative;overflow:hidden;">
                <div style="width: 400px;height: 220px;padding-top: 20px;" class="shang" v-show="show4" @mouseenter="show4=false">
                    <p style="text-align: center;"><img src="../assets/jingzhun.png" style="width: 100px;height:100px;"></p>
                    <p style="text-align: center;margin-top: 20px;font-size: 24px;color: #333;font-family: 微软雅黑;">精准</p>
                </div>
                <div style="width: 400px;height: 220px;background-color: #eee;padding-top: 30px;" class="xia" @mouseleave="show4=true">
                    <p style="text-align: center;"><img src="../assets/jingzhun_icon.png" style="display: inline-block;margin-right: 20px;"><span style="color: white;font-size: 24px;vertical-align: middle;">精准</span></p>
                    <p style="width: 300px;margin-left: 50px;font-family: 新宋体;color: #666;font-size: 14px;line-height: 25px;margin-top: 20px;text-align: center;">运用AI技术精准分析<br>场景信息，气氛信息，角色姓名，<br>在线编辑，随心所欲</p>
                </div>
            </div>
            <!-- 精准板块结束 -->
            <div class="col-xs-4" style="width: 400px;height: 220px;position: relative;overflow:hidden;">
                <div style="width: 400px;height: 220px;padding-top: 20px;" class="shang" v-show="show5" @mouseenter="show5=false">
                    <p style="text-align: center;"><img src="../assets/anquan.png" style="width: 100px;height:100px;"></p>
                    <p style="text-align: center;margin-top: 20px;font-size: 24px;color: #333;font-family: 微软雅黑;">安全</p>
                </div>
                <div style="width: 400px;height: 220px;background-color: #eee;padding-top: 30px;" class="xia" @mouseleave="show5=true">
                    <p style="text-align: center;"><img src="../assets/anquan_icon.png" style="display: inline-block;margin-right: 20px;"><span style="color: white;font-size: 24px;vertical-align: middle;">安全</span></p>
                    <p style="width: 300px;margin-left: 50px;font-family: 新宋体;color: #666;font-size: 14px;line-height: 25px;margin-top: 20px;text-align: center;">接口云加密处理<br>保护您剧本内容，及组员信息安全<br>确保拍摄信息不外泄</p>
                </div>
            </div>
            <!-- 安全板块结束 -->
            <div class="col-xs-4" style="width: 400px;height: 220px;position: relative;overflow:hidden;">
                <div style="width: 400px;height: 220px;padding-top: 20px;" class="shang" v-show="show" @mouseenter="show=false">
                    <p style="text-align: center;"><img src="../assets/xiazai.png" style="width: 100px;height:100px;"></p>
                    <p style="text-align: center;margin-top: 20px;font-size: 24px;color: #333;font-family: 微软雅黑;">下载</p>
                </div>
                <div style="width: 400px;height: 220px;background-color: #eee;padding-top: 30px;" class="xia" @mouseleave="show=true">
                    <p style="text-align: center;"><img src="../assets/xiazai_icon.png" style="display: inline-block;margin-right: 20px;"><span style="color: white;font-size: 24px;vertical-align: middle;">下载</span></p>
                    <p style="width: 300px;margin-left: 50px;font-family: 新宋体;color: #666;font-size: 14px;line-height: 25px;margin-top: 40px;text-align: center;">一键生成Excel表格<br>方便您对场景表再加工编辑</p>
                </div>
            </div>
            <!-- 下载板块结束 -->
        </div>




        <!--介绍结束-->
        <span class="duanpian block" style="height: 700px;margin-bottom: -105px;">
						<ul>
							<li class="col-xs-4">
								<a href="#" class="demo" style="text-decoration: none;">
									<span class="tupian block" style="position: relative;">
										<span class="zhezhao url1" style="margin-left:-5px;display: block;">
										</span>
										<span class="mask block">电影拍摄</span>
									</span>
								</a>
							</li>
							<li class="col-xs-4">
								<span class="zhezhao block" style="background-color: black;line-height: 260px;text-align: center;font-size: 36px;color: #fff;margin-left:-5px;">应用场景</span>
							</li>
							<li class="col-xs-4">
								<a href="#" class="demo" style="text-decoration: none;">
									<span class="tupian block" style="position: relative;">
										<span class="zhezhao url3" style="margin-left: -5px;display: block;">
										</span>
										<span class="mask" style="display: block;">网络大电影拍摄</span>
									</span>
								</a>
							</li>
							<li class="col-xs-4">
								<a href="#" class="demo" style="text-decoration: none;">
									<span class="tupian" style="position: relative;display: block;">
										<span class="zhezhao url4" style="margin-left:-5px;display: block;">
										</span>
										<span class="mask" style="display: block;">电视剧拍摄</span>
									</span>
								</a>
							</li>
							<li class="col-xs-4">
								<a href="#" class="demo" style="text-decoration: none;">
									<span class="tupian" style="position: relative;display: block;">
										<span class="zhezhao block url5" style="margin-left:-5px;">
										</span>
										<span class="mask block">影视短片</span>
									</span>
								</a>
							</li>
							<li class="col-xs-4">
								<a href="#" class="demo" style="text-decoration: none;">
									<span class="tupian block" style="position: relative;">
										<span class="zhezhao block url6" style="margin-left:-5px;">
										</span>
										<span class="mask block">网剧拍摄</span>
									</span>
								</a>
							</li>
						</ul>
					</span><!--短片结束-->
        <span class="tese block" style="margin-bottom: 122px;">
						<span class="tese_title block">产品特色</span>
						<span class="tese_content block">
							<ul>
								<li class="tese_right col-xs-3"><img src="../assets/tese1.png"><p>影视统筹表<br>一键生成及下载</p></li>
								<li class="tese_right col-xs-3"><img src="../assets/tese2.png"><p>分场景表/人物<br>戏量统计表智能生成</p></li>
								<li class="tese_right col-xs-3"><img src="../assets/tese3.png"><p>项目独立成项<br>保存剧本及项目修改路径</p></li>
								<li class="tese_right col-xs-3"><img src="../assets/tese4.png"><p>剧本加密处理技术<br>防止重要信息外泄</p></li>
								<li class="col-xs-3"><img src="../assets/tese5.png"><p style="line-height: 50px;">实现影视剧项目云管理</p></li>
							</ul>
						</span>
					</span><!--产品特色结束-->
    </div>
</template>

<script>
    export default {
        name: "introduce",
        data () {
            return{
                show: true,
                show1: true,
                show2: true,
                show3: true,
                show4: true,
                show5: true
            }
        }
    }
</script>

<style scoped>
.col-xs-3{
     transition: transform 0.25s ease;
}
    .col-xs-3:hover{
        transform: scale(1.1,1.1);
        box-shadow: 0px 2px 5px 1px rgba(0,0,0,.06);
    }
</style>