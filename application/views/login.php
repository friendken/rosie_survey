<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <!-- Le styles -->
        <link href="<?php echo site_url() ?>www/css/bootstrap.css" rel="stylesheet">
        <link href="<?php echo site_url() ?>www/css/bootstrap-responsive.css" rel="stylesheet">
        <link href="<?php echo site_url() ?>www/css/stylesheet.css" rel="stylesheet">
        <link href="<?php echo site_url() ?>www/icon/font-awesome.css" rel="stylesheet">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>

        <!-- Le fav and touch icons -->
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo site_url() ?>www/img/apple-touch-icon-144-precomposed.html">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo site_url() ?>www/img/apple-touch-icon-114-precomposed.html">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo site_url() ?>www/img/apple-touch-icon-72-precomposed.html">
        <link rel="apple-touch-icon-precomposed" href="<?php echo site_url() ?>www/img/apple-touch-icon-57-precomposed.html">
        <link rel="shortcut icon" href="www/img/favicon.png">

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
          <script src="js/html5shiv.js"></script>
        <![endif]-->
    </head>

    <body>

        <div class="login-container opacity">
            <div class="login-header bordered">
                <h4>Sign in</h4>
            </div>
            <form action="user" method="POST" >
                <div class="login-field">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username">
                    <i class="icon-user"></i>
                </div>
                <div class="login-field">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password">
                    <i class="icon-lock"></i>
                </div>
                <div class="login-button clearfix">
                    <label class="checkbox pull-left">
                        <input type="checkbox" class="uniform" name="checkbox1"> Remember me
                    </label>
                    <button type="submit" class="pull-right btn btn-large blue">SIGN IN <i class="icon-arrow-right"></i></button>
                </div>
                <div class="forgot-password">
                    <a href="#forgot-pw" role="button" data-toggle="modal">Forgot password?</a>
                </div>
            </form>
        </div>

        <div id="forgot-pw" class="modal hide fade" tabindex="-1" data-width="760">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button>
                <h3>Forgot your password?</h3>
            </div>
            <div class="modal-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="form_row">
                            <label class="field_name">Email address</label>
                            <div class="field">
                                <div class="row-fluid">
                                    <div class="span8">
                                        <input type="text" class="span12" name="email" placeholder="example@domain.com">
                                    </div>
                                    <div class="span4">
                                        <a href="#" class="btn btn-block blue">Reset password</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Le javascript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="<?php echo site_url() ?>www/js/jquery-1.10.2.js"></script>
        <script src="<?php echo site_url() ?>www/js/jquery-ui-1.10.3.js"></script>
        <script src="<?php echo site_url() ?>www/js/bootstrap.js"></script>

        <script src="<?php echo site_url() ?>www/js/library/jquery.collapsible.min.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/jquery.mCustomScrollbar.min.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/jquery.mousewheel.min.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/jquery.uniform.min.js"></script>

        <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCL6XtCGot7S7cfxnO6tRfeZx9kLQQRMtA&amp;sensor=false"></script>
        <script src="<?php echo site_url() ?>www/js/library/jquery.sparkline.min.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/chosen.jquery.min.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/jquery.easytabs.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/flot/excanvas.min.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/flot/jquery.flot.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/flot/jquery.flot.pie.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/flot/jquery.flot.selection.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/flot/jquery.flot.resize.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/flot/jquery.flot.orderBars.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/maps/jquery.vmap.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/maps/maps/jquery.vmap.world.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/maps/data/jquery.vmap.sampledata.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/jquery.autosize-min.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/charCount.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/jquery.minicolors.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/jquery.tagsinput.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/fullcalendar.min.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/footable/footable.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/footable/data-generator.js"></script>

        <script src="<?php echo site_url() ?>www/js/library/bootstrap-datetimepicker.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/bootstrap-timepicker.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/bootstrap-datepicker.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/bootstrap-fileupload.js"></script>
        <script src="<?php echo site_url() ?>www/js/library/jquery.inputmask.bundle.js"></script>

        <script src="<?php echo site_url() ?>www/js/library/jquery.backstretch.min.js"></script>

        <script>
            jQuery(document).ready(function ($) {
                $('.uniform').uniform();
            });

            jQuery.backstretch([
                "<?php echo site_url() ?>www/demo/slide_01.jpg",
                "<?php echo site_url() ?>www/demo/slide_02.jpg",
                "<?php echo site_url() ?>www/demo/slide_03.jpg",
                "<?php echo site_url() ?>www/demo/slide_04.jpg"
            ], {
                duration: 5000, fade: 1000
            });
        </script>

    </body>
</html>
