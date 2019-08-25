!(function($){
    $.fn.Synload = function(url,success,error){
        success = success || function(){};
        error = error || function(){};
        return this.each(function(){
            var $this = $(this);
            $.ajax({
                url:url,
                async:false,
                success:function(res){
                    $this.html(res);
                    success(res);
                },
                error:function(res){
                    error(res);
                }

            })
        })
    }
})(jQuery)

$(function(){
    var index = 0;

    loadPage();
    function loadPage(){
        $('#head').Synload('./pages/head.html',function(){
            $('#footer').Synload('./pages/footer.html',function(){

            })
        })
    }
})