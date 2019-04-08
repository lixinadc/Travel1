
$(function () {

	$("#registForm1").bootstrapValidator({
		message : "注册表单填写错误！" ,
		feedbackIcons: {			// 图标设置
			valid: 'glyphicon glyphicon-ok',		// 合格
			invalid: 'glyphicon glyphicon-remove',	// 不合格
			validating: 'glyphicon glyphicon-refresh'	// 校验中，，，
		},
		fields : {
			username: {
					message : '注册账号有误' , 
					validators : {
						notEmpty : {
							message : '必须填写账号！' 
						} ,
						remote : {
							message : '用户名已存在！' ,
							type : 'post' ,
	                    	url : 'user/only.do' ,    			                    	
	                    	delay : 2000
						}
					} ,
			} ,
			password : {
				message : '密码填写错误！' ,
				validators : {
					notEmpty : {
						message : '必须填写密码！' 
					} ,
					stringLength : {
						message : '长度应该在3--10之间' ,
						min : 3 ,
						max : 10 ,
					} ,
					identical: {   //相同
                         field: 'password2',
                         message: '两次密码不一致'
                     },
                     regexp: {//匹配规则
                         regexp: /^[a-zA-Z0-9_\.]+$/,
                         message: '密码只能使用数字和字母'
                     }
				}
			} ,
			password2 : {
				message : '确认密码填写错误！' ,
				validators : {    							
					notEmpty : {
						message : '必须填写核对密码 ！' 
					} ,
					identical: {   //相同
                         field: 'password',
                         message: '两次密码不一致'
                     }
                    
				}
			} ,
			email : {
				message : '电子邮件填写错误！' ,
				validators : {
					notEmpty : {
						message : '必须填写邮箱!' 
					} ,
						emailAddress: {
	                        message: '请输入正确的邮件地址如：123@qq.com'
	                    },
	                    regexp: {//匹配规则
	                         regexp: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
	                         message: '请输入正确的邮件地址如：123@qq.com'
	                     }
				}
			} ,
			phone : {
				message : '电话填写错误！' ,
				validators : {
					notEmpty : {
						message : '必须填写电话！' 
					} ,
					stringLength: {
                         min: 11,
                         max: 11,
                         message: '请输入11位手机号码'
                     },
                     regexp: {
                         regexp: /^1[3|5|8]{1}[0-9]{9}$/,
                         message: '请输入正确的手机号码'
                     }
				}
			},
		place:{
			message : '请填写地址！' ,
			validators : {
				notEmpty : {
					message : '必须填写地址！' 
				} 
				
			} ,
		}
		}
	}).on('success.form.bv', function(e) {//点击提交之后
			 // 阻止表单提交
			 e.preventDefault();

			 // 获取表单引用
			 var $form = $(e.target);

			 // 得到bootstrapvalidator实例
			 var bv = $form.data('bootstrapValidator');

			 // 使用Ajax提交表单并进行校验
			 $.post('user/regist.do', $form.serialize(), function(res) {
				//var resObj = JSON.parse(res) ;
					console.dir(res.result) ;
					if(res.result == "true") {
						bootbox.alert("注册成功!") ;
						location.href="login.html" ;
					} else {
						bootbox.alert("注册失败！") ;
					}
			});
	});
});