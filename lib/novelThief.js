/**
 * Created by 王伟 on 2017/1/11.
 */
var db=require('./db');
var http=require('./httpHelper');
var cheerio=require('cheerio');

var domain='http://www.qu.la';//偷取对象的域名地址
var autoPage='http://www.qu.la/xiaoshuodaquan/';//全自动时偷取参考页面

function novelThief() {

}
/**
 * 偷取指定网页源代码
 * url偷取的网页网址
 * callback(data)  data偷取到的源代码字符串
 **/
novelThief.prototype.getPageHtml=function(url,callback){
    http.get(url,10000,function (err,data) {
            if(!err){
                callback(data);
            };
        },'gbk','Mozilla/5.0 (Windows NT 10.0; rv:49.0) Gecko/20100101 Firefox/49.0'
    );
};

/**
 * 获取所有小说列表
 * callback(arr)  arr小说地址列表数组
 * */
novelThief.prototype.getAllNovelUrl=function (callback) {
    var html=this.getPageHtml(autoPage,function (data) {
        //分析数据
        var arr=[];
        var $=cheerio.load(data);
        $('.novellist a').each(function () {
            arr.push(domain+$(this).attr('href'));
        });
        callback(arr);
    });
};

/**
 * 根据小说地址抓取小说信息，包括小说名，作者，分类，章节列表，图片地址
 * novelUrl小说地址
 * callback(novel) novel:{
 *  name:"小说名",
 *  description:"小说简介",
 *  imgUrl:"图片地址",
 *  sourceUrl:'小说源地址',
 *  author:"作者",
 *  category:"分类",
 *  lastUpdateTime:'最后更新时间',
 *  sections:[//章节列表
 *      {
 *          index:0 //章节排序
 *          name:"章节名称"，
 *          sourceUrl:"章节源地址",
 *          content:"章节类容",
 *          status:0 //章节状态，0代表没有，10代表已经获取到内容
 *      }
 *  ]
 * }
 * */
novelThief.prototype.getAllNovelInfo=function (novelUrl, callback) {
    this.getPageHtml(novelUrl,function (data) {
        try{//尝试
            var novel={};
            var $=cheerio.load(data);
            novel.name=$("#info h1").text().trim();
            novel.author=$($("#info p")[0]).text().replace(/作.*者：/,'');
            novel.description=$("#intro").text();
            novel.category=$(".con_top").text().match(/>.*>/)[0].replace(/>/g,'');
            novel.imgUrl=$("#fmimg img").attr('src');
            novel.sourceUrl=novelUrl;
            novel.lastUpdateTime=new Date();
            novel.sections=[];
            $("#list a").each(function (index,ele) {
                var section={};
                section.index=index;
                section.name=$(this).text();
                section.sourceUrl=novelUrl+$(this).attr('href');
                section.status=0;
                //section.content=
                if(section.name){
                    novel.sections.push(section);
                }

            });
            callback(novel);
        }catch(ex){//如果尝试失败，则跳转到这里
            console.log(ex.message);
        }finally{//不管有没有失败，最后都会执行这里的代码
            //一般用于关闭数据库
        }
    });
};

/**
 * 偷取章节内容
 * url章节地址
 * callback(content)  content章节内容字符串
 * */
novelThief.prototype.getSection=function (url,callback) {
    this.getPageHtml(url,function (data) {
        var $=cheerio.load(data,{decodeEntities: false});
        var content=$("#content").html().replace(/<script>.*<\/script>/g,'');
        callback(content);
    });
};

module.exports=new novelThief();
