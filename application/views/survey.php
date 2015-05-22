<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,300' rel='stylesheet' type='text/css'>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Survey</title>

    <!-- Bootstrap -->
    <link href="www/css/survey/bootstrap.css" rel="stylesheet">
    <link href="www/css/survey/style.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="www/js/jquery-1.10.2.js"></script>
    <script src="www/js/angular/angular.js"></script>
    <script src="www/js/angular-route/angular-ui-router.js"></script>
    <script src="www/js/angular/ui-bootstrap.min.js"></script>

    <script src="www/js/survey/app.js"></script>
    <script src="www/js/survey/services.js"></script>
    <script src="www/js/survey/directives.js"></script>
    <script src="www/js/survey/controllers.js"></script>
    <script src="www/js/survey/filters.js"></script>

    <script type="text/javascript">
        var config = {base: '<?php echo site_url() ?>'}
    </script>
</head>
<body ng-app="survey">
<article class="fix-survey">
    <a class="btn-custom" href="#"><i class="glyphicon glyphicon-play-circle"></i>   Start Survey</a>
</article>
<article class="page page-home">

    <header>
        <article class="container">
            <article id="header" class="col-md-12">

                <img class="img-responsive" src="www/img/survey/logo.jpg" alt="Cao Duong Ngan">

            </article>
        </article>
    </header>
    <article class="full-screen">
        <section class="container">
            <nav id="menu"  class="navbar navbar-default">

                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <!-- <a class="navbar-brand" href="#">Brand</a> -->
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" ng-controller="menuController">
                    <ul class="nav navbar-nav">
                        <li class="profile" ng-click="selectMenu($event)"><a href="#profile">researcher’s Profile</a></li>
                        <li class="survey" ng-click="selectMenu($event)"><a href="#survey">Research Interest</a></li>
<!--                        <li><a href="#">Academic Blog</a></li>-->
                        <li class='contact' ng-click="selectMenu($event)"><a href="#contact">Contact</a></li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </nav>
        </section>

    </article>
    <article class="main container">
        <section id="title-page">
            <h3><span>Smart financial decisions for the future:</span><br>Saving & Investment</h3>
        </section>

        <section class="main_container" ui-view="content">
            <!-- main container -->
        </section>
    </article>
</article>
<footer>
    <article id="footer" class="container">
        <section class="col-md-12">
            <nav  class="menu-footer col-md-12">
                <a href="#">researcher’s Profile</a>
                <a href="#">Research Survey</a>
                <a href="#">Academic Blog </a>
                <a href="#">Contact</a>
            </nav>
        </section>
        <span>@2015</span>
    </article>
</footer>
</article>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="www/js/bootstrap.js"></script>
</body>
</html>