<!DOCTYPE html>
<html lang="en">
    <head>
        
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
        <title>Administration</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <!-- Le styles -->
        <link href="www/css/bootstrap.css" rel="stylesheet">
        <link href="www/css/bootstrap-responsive.css" rel="stylesheet">
        <link href="www/css/stylesheet.css" rel="stylesheet">
        <link href="www/icon/font-awesome.css" rel="stylesheet">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>

        <!-- Le fav and touch icons -->
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="www/img/apple-touch-icon-144-precomposed.html">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="www/img/apple-touch-icon-114-precomposed.html">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="www/img/apple-touch-icon-72-precomposed.html">
        <link rel="apple-touch-icon-precomposed" href="www/img/apple-touch-icon-57-precomposed.html">
        <link rel="shortcut icon" href="www/img/favicon.png">

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
          <script src="js/html5shiv.js"></script>
        <![endif]-->
        <script src="www/js/jquery-1.10.2.js"></script>
        <script src="www/js/jquery-ui-1.10.3.js"></script>
        <script src="www/js/bootstrap.js"></script>

        <script src="www/js/library/jquery.collapsible.min.js"></script>
        <script src="www/js/library/jquery.mCustomScrollbar.min.js"></script>
        <script src="www/js/library/jquery.mousewheel.min.js"></script>
        <script src="www/js/library/jquery.uniform.min.js"></script>

        <!--<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCL6XtCGot7S7cfxnO6tRfeZx9kLQQRMtA&amp;sensor=false"></script>-->
        <script src="www/js/library/jquery.sparkline.min.js"></script>
        <script src="www/js/library/chosen.jquery.min.js"></script>
        
        <script src="www/js/library/flot/excanvas.min.js"></script>
        <script src="www/js/library/flot/jquery.flot.js"></script>
        <script src="www/js/library/flot/jquery.flot.pie.js"></script>
        <script src="www/js/library/flot/jquery.flot.selection.js"></script>
        <script src="www/js/library/flot/jquery.flot.resize.js"></script>
        <script src="www/js/library/flot/jquery.flot.orderBars.js"></script>
        <!--<script src="www/js/library/maps/jquery.vmap.js"></script>-->
        <!--<script src="www/js/library/maps/maps/jquery.vmap.world.js"></script>-->
        <!--<script src="www/js/library/maps/data/jquery.vmap.sampledata.js"></script>-->
        <script src="www/js/library/jquery.autosize-min.js"></script>
        <script src="www/js/library/charCount.js"></script>
        <script src="www/js/library/jquery.minicolors.js"></script>
        <script src="www/js/library/jquery.tagsinput.js"></script>
        <script src="www/js/library/fullcalendar.min.js"></script>
        <script src="www/js/library/footable/footable.js"></script>
        <script src="www/js/library/footable/data-generator.js"></script>

        <script src="www/js/library/bootstrap-datetimepicker.js"></script>
        <script src="www/js/library/bootstrap-timepicker.js"></script>
        <script src="www/js/library/bootstrap-datepicker.js"></script>
        <script src="www/js/library/bootstrap-fileupload.js"></script>
        <script src="www/js/library/jquery.inputmask.bundle.js"></script>
        <script src="www/js/flatpoint_core.js"></script>
        <script src="www/js/library/bootstrap-select.js"></script>
        <script src="www/js/moment.js"></script>
        <script src="www/third_party/ckeditor/ckeditor.js"></script>

        <script src="www/js/angular/angular.js"></script>
        
        <script src="www/js/angular-route/angular-ui-router.js"></script>
        <script src="www/js/administration/app.js"></script>
        <script src="www/js/administration/services.js"></script>
        <script src="www/js/administration/directives.js"></script>
        <script src="www/js/administration/controller.questions.js"></script>
        <script src="www/js/administration/controller.message-center.js"></script>
        <script src="www/js/administration/modal/modalController.js"></script>
        <script src="www/js/administration/filters.js"></script>
        <script src="www/js/angular/ui-bootstrap.min.js"></script>
        <script type="text/javascript">
            var config = {base: '<?php echo site_url() ?>'}
        </script>
    </head>

    <body ng-app="administration">

        <header class="dark_grey" ng-controller="headerController"> <!-- Header start -->
            <a href="#" class="logo_image"><span class="hidden-480">FlatPoint</span></a>
            <ul class="header_actions pull-left hidden-480 hidden-768">
                <li rel="tooltip" data-placement="bottom" title="Hide/Show main navigation" ><a href="#" class="hide_navigation"><i class="icon-chevron-left"></i></a></li>
                <li rel="tooltip" data-placement="right" title="Change navigation color scheme" class="color_pick navigation_color_pick"><a class="iconic" href="#"><i class="icon-th"></i></a>
                    <ul>
                        <li><a class="blue" href="#"></a></li>
                        <li><a class="light_blue" href="#"></a></li>
                        <li><a class="grey" href="#"></a></li>
                        <li><a class="dark_grey" href="#"></a></li>
                        <li><a class="pink" href="#"></a></li>
                        <li><a class="red" href="#"></a></li>
                        <li><a class="orange" href="#"></a></li>
                        <li><a class="yellow" href="#"></a></li>
                        <li><a class="green" href="#"></a></li>
                        <li><a class="dark_green" href="#"></a></li>
                        <li><a class="turq" href="#"></a></li>
                        <li><a class="dark_turq" href="#"></a></li>
                        <li><a class="purple" href="#"></a></li>
                        <li><a class="violet" href="#"></a></li>
                        <li><a class="dark_blue" href="#"></a></li>
                        <li><a class="dark_red" href="#"></a></li>
                        <li><a class="brown" href="#"></a></li>
                        <li><a class="black" href="#"></a></li>
                        <a class="dark_navigation" href="#">Dark navigation</a>
                    </ul>
                </li>
            </ul>
            <ul class="header_actions">
                <li rel="tooltip" data-placement="left" title="Header color scheme" class="color_pick header_color_pick hidden-480"><a class="iconic" href="#"><i class="icon-th"></i></a>
                    <ul>
                        <li><a class="blue set_color" href="#"></a></li>
                        <li><a class="light_blue set_color" href="#"></a></li>
                        <li><a class="grey set_color" href="#"></a></li>
                        <li><a class="dark_grey set_color" href="#"></a></li>
                        <li><a class="pink set_color" href="#"></a></li>
                        <li><a class="red set_color" href="#"></a></li>
                        <li><a class="orange set_color" href="#"></a></li>
                        <li><a class="yellow set_color" href="#"></a></li>
                        <li><a class="green set_color" href="#"></a></li>
                        <li><a class="dark_green set_color" href="#"></a></li>
                        <li><a class="turq set_color" href="#"></a></li>
                        <li><a class="dark_turq set_color" href="#"></a></li>
                        <li><a class="purple set_color" href="#"></a></li>
                        <li><a class="violet set_color" href="#"></a></li>
                        <li><a class="dark_blue set_color" href="#"></a></li>
                        <li><a class="dark_red set_color" href="#"></a></li>
                        <li><a class="brown set_color" href="#"></a></li>
                        <li><a class="black set_color" href="#"></a></li>
                    </ul>
                </li>
                <li rel="tooltip" data-placement="bottom" title="2 new messages" class="hidden-480 messages"><a class="iconic" href="#"><i class="icon-envelope-alt"></i> {{ count }}</a>
                    <ul class="dropdown-menu pull-right messages_dropdown">
                        <li ng-repeat="(key,item) in messages">
                            <a href="#message-detail/{{item.id}}">
                                <div class="details">
                                    <div class="name">{{ item.name }}</div>
                                    <div class="message">
                                        {{item.message}}
                                    </div>
                                </div>
                            </a>
                        </li>
                        <a href="#message-center" class="btn btn-block blue align_left"><span>Messages center</span></a>
                    </ul>
                </li>
                <li class="dropdown"><a href="#"><img src="www/img/survey/author.jpg" alt="User image" class="avatar"> Rosie Cao <i class="icon-angle-down"></i></a>
                    <ul>
                        <li><a href="#"><i class="icon-cog"></i> User options</a></li>
                        <li><a href="#"><i class="icon-inbox"></i> Messages</a></li>
                        <li><a href="#"><i class="icon-user"></i> Friends</a></li>
                        <li><a href="#"><i class="icon-remove"></i> Logout</a></li>
                    </ul>
                </li>
                <li><a href="administration/login/logout"><i class="icon-signout"></i> <span class="hidden-768 hidden-480">Logout</span></a></li>
                <li class="responsive_menu"><a class="iconic" href="#"><i class="icon-reorder"></i></a></li>
            </ul>
        </header>

        <div id="main_navigation" class="dark_grey"> <!-- Main navigation start -->
            <?php include 'include/left_menu_admin.html'; ?>
        </div>  

            <div id="content" class="no-sidebar" ng-app="administration"> <!-- Content start -->
            <div class="inner_content">
                <div class="top_bar">
                    <ul class="breadcrumb">
                        <li><a href="dashboard.html"><i class="icon-home"></i></a> <span class="divider">/</span></li>
                        <li class="active"><a href="#">Dashboard</a></li>
                    </ul>
                </div>

                <div class="widgets_area" ui-view="content">

                </div>
            </div>
        </div>
    </div>

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->



    <script>
        jQuery(document).ready(function ($) {
            $('.footable').footable();
            $('.responsive_table_container').mCustomScrollbar({
                set_height: 400,
                advanced: {
                    updateOnContentResize: true,
                    updateOnBrowserResize: true
                }
            });

            $('.responsive_table_container_2').mCustomScrollbar({
                set_height: 520,
                advanced: {
                    updateOnContentResize: true,
                    updateOnBrowserResize: true
                }
            });
        });
    </script>

    <script src="www/js/calendar.js"></script>
    <script src="www/js/forms.js"></script>
    <script src="www/js/dashboard.js"></script>

</body>
</html>
