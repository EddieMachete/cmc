<?php
include 'Mobile_Detect.php';
$detect = new Mobile_Detect();
$isMobile = $detect->isMobile() && !$detect->isTablet();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <title>Home :: Custom Metal Contracting Ltd.</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="en-us" />
    <meta name="distribution" content="Global" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="Styles/Common.css" rel="stylesheet" type="text/css" />
    <link href="Styles/index.css" rel="stylesheet" type="text/css" />
    <script language="javascript" type="text/javascript" src="Scripts/jquery.min.js"></script>
    <script language="javascript" type="text/javascript" src="Scripts/ResizeForMobile.js"></script>
    <script language="javascript" type="text/javascript" src="Scripts/sci/SciBootstrap.js"></script>
    <script language="javascript" type="text/javascript" src="Scripts/sci/Calculations.js"></script>
    <script language="javascript" type="text/javascript" src="Scripts/sci/ui/BackgroundCarousel.js"></script>
    <script language="javascript" type="text/javascript">
        $(Body_Load);
        
        function Body_Load()
        {
            var jqueryHelper = $('.backgroundCarousel');
            var carouselController = new sci.ui.BackgroundCarousel();
            carouselController.Initialize(jqueryHelper.filter('.backgroundCarousel').first());
        }
    </script>
</head>
<body>
    <div id="Header">
        <div class="logo">
            <a href="index.php"><img src="Images/Logo.png" width="164" height="103" /></a>
        </div>
        <div class="slogan">Building your legacy</div>
        <div class="mainNavigation">
            <ul>
                <li class="selected"><a href="index.php">Home</a></li>
                <li><a href="Company.html">Company</a></li>
                <li><a href="Systems.html">Systems</a></li>
                <li><a href="Surfaces.html">Surfaces</a></li>
                <li><a href="Portfolio.html">Portfolio</a></li>
                <li><a href="Downloads.html">Downloads</a></li>
                <li><a href="Contact.html">Contact</a></li>
            </ul>
        </div>
    </div>
    <div id="MainContent">
        <div class="backgroundCarousel">
            <div class="slide" <?php print($isMobile ? 'data-image-width="1200" data-image-height="727"' : 'data-image-width="1200" data-image-height="727"'); ?> data-slide-duration="8000" data-slide="one">
                <?php print($isMobile ? '<img src="Images/Large/hotel-alma.jpg" width="1200" height="727" />' : '<img src="Images/Large/hotel-alma.jpg" width="1200" height="727" />'); ?>
                <div class="details">
                    <div class="highlight"></div>
                    <div class="title">News & announcements</div>
                    <div class="description">
                        Hotel Alma located at the University of Calgary is a recently completed Aluminum Composite Rainscreen Panel system project.
                    </div>
                    <ul class="options">
                        <li><a href="NewsAndAnnouncements.html">View CMC News &amp; Announcments</a></li>
                        <li><a href="Portfolio.html">View Hotel Alma in Portfolio</a></li>
                        <li><a href="Surfaces.html">View 4mm Aluminum Composite Rainscreen Panel System, in three custom colours, as Manufactured, Supplied and Installed by Custom Metal.</a></li>
                        <li><a href="Downloads.html">View CP Series 20 &ndash; See downloads for details</a></li>
                    </ul>
                </div>
            </div>
            <div class="slide hidden" <?php print($isMobile ? 'data-image-width="1200" data-image-height="798"' : 'data-image-width="1200" data-image-height="798"'); ?> data-slide-duration="8000" data-slide="two">
                <?php print($isMobile ? '<img src="Images/Large/calgary-tower.jpg" width="1200" height="798" />' : '<img src="Images/Large/calgary-tower.jpg" width="1200" height="798" />'); ?>
                <div class="details">
                    <div class="highlight"></div>
                    <div class="title">Calgary Tower</div>
                    <div class="description">
                        This Iconic local landmark is a proud piece in our vast portfolio.<br/>It is recognizable worldwide and identifies the &quot;Heart of the New West&quot;.
                    </div>
                    <ul class="options">
                        <li><a href="Portfolio.html">View the Calgary Tower</a></li>
                        <li><a href="Surfaces.html">View 3.25 mm AP Rainscreen Aluminum panel system as manufactured, Supplied and Installed by Custom Metal.</a></li>
                    </ul>
                </div>
            </div>
            <div class="slide hidden" <?php print($isMobile ? 'data-image-width="1200" data-image-height="797"' : 'data-image-width="1200" data-image-height="797"'); ?> data-slide-duration="8000" data-slide="three">
                <?php print($isMobile ? '<img src="Images/Large/california-university.jpg" width="1200" height="797" />' : '<img src="Images/Large/california-university.jpg" width="1200" height="797" />'); ?>
                <div class="details">
                    <div class="highlight"></div>
                    <div class="title">Metal roofing and cladding</div>
                    <div class="description">
                        This long lasting maintenance free solution is proven economical.<br/>High quality, light weight roofing system is fabricated on-site to fit the specific dimensions, eliminate seams and help reduce structural framing costs.
                    </div>
                    <ul class="options">
                        <li><a href="Portfolio.html">View California University in Portfolio</a></li>
                        <li><a href="Surfaces.html">View CP &ndash; 4mm Composite Aluminum Panel system series 20</a></li>
                    </ul>
                </div>
            </div>
            <div class="slide hidden" <?php print($isMobile ? 'data-image-width="1200" data-image-height="797"' : 'data-image-width="1200" data-image-height="797"'); ?> data-slide-duration="8000" data-slide="four">
                <?php print($isMobile ? '<img src="Images/Large/alberta-childrens-hospital.jpg" width="1200" height="797" />' : '<img src="Images/Large/alberta-childrens-hospital.jpg" width="1200" height="797" />'); ?>
                <div class="details">
                    <div class="highlight"></div>
                    <div class="title">Awards</div>
                    <div class="description">
                        CMC has a long history of many prestigious acknowledgements.<br/>Our most recent award is the Alcoa Outstanding Achievement Award.
                    </div>
                    <ul class="options">
                        <li><a href="Portfolio.html">View Alberta Childrens Hospital in Portfolio</a></li>
                        <li><a href="Surfaces.html">View 7/8&quot; corrugated cladding used on the Hospital.</a></li>
                        <li><a href="NewsAndAnnouncements.html">View Awards in News & Announcements Section</a></li>
                    </ul>
                </div>
            </div>
            <div class="slide hidden" <?php print($isMobile ? 'data-image-width="1200" data-image-height="900"' : 'data-image-width="1200" data-image-height="900"'); ?> data-slide-duration="8000" data-slide="five">
                <?php print($isMobile ? '<img src="Images/Large/science-centre.jpg" width="1200" height="900" />' : '<img src="Images/Large/science-centre.jpg" width="1200" height="900" />'); ?>
                <div class="details">
                    <div class="highlight"></div>
                    <div class="title">Telus Science Centre</div>
                    <div class="description">
                        With its seamless structure this building is an architecture marvel.<br/>It is made with pressure equalized Rainscreen panel System Series 20.
                    </div>
                    <ul class="options">
                        <li><a href="Portfolio.html">View in Portfolio</a></li>
                        <li><a href="Surfaces.html">View 4mm Aluminum Composite Material in a pressure equalized Rainscreen panel system. Series 20</a></li>
                    </ul>
                </div>
            </div>
            <div class="slide hidden" <?php print($isMobile ? 'data-image-width="1200" data-image-height="900"' : 'data-image-width="1200" data-image-height="900"'); ?> data-slide-duration="8000" data-slide="six">
                <?php print($isMobile ? '<img src="Images/Large/teacher-union.jpg" width="1200" height="900" />' : '<img src="Images/Large/teacher-union.jpg" width="1200" height="900" />'); ?>
                <div class="details">
                    <div class="highlight"></div>
                    <div class="title">Custom metal contracting</div>
                    <div class="description">
                        Industry Leadership through Innovation and a commitment to customer satisfaction.
                    </div>
                    <ul class="options">
                        <li><a href="Portfolio.html">View Alberta Teachers Union in Portfolio</a></li>
                        <li><a href="Surfaces.html">View Custom Colour 4mm Composite Aluminum Material in our popular series 20 Rainscreen system.</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="filmStrip">
            <ul class="filmStripInner">
                <li class="thumb selected">
                    <div class="thumbInner" style="background-image: url('Images/FilmStrip/hotel-alma.jpg')">
                        <div class="title" data-slide="one">
                            <span>Hotel Alma</span>
                        </div>
                    </div>
                </li>
                <li class="thumb">
                    <div class="thumbInner" style="background-image: url('Images/FilmStrip/calgary-tower.jpg')">
                        <div class="title" data-slide="two">
                            <span>Calgary Tower</span>
                        </div>
                    </div>
                </li>
                <li class="thumb">
                    <div class="thumbInner" style="background-image: url('Images/FilmStrip/california-university.jpg')">
                        <div class="title" data-slide="three">
                            <span>California University</span>
                        </div>
                    </div>
                </li>
                <li class="thumb">
                    <div class="thumbInner" style="background-image: url('Images/FilmStrip/childrens-hospital-1.jpg')">
                        <div class="title" data-slide="four">
                            <span>Childrens Hospital</span>
                        </div>
                    </div>
                </li>
                <li class="thumb">
                    <div class="thumbInner" style="background-image: url('Images/FilmStrip/calgary-tower.jpg')">
                        <div class="title" data-slide="five">
                            <span>Calgary Tower 5</span>
                        </div>
                    </div>
                </li>
                <li class="thumb">
                    <div class="thumbInner" style="background-image: url('Images/FilmStrip/calgary-tower.jpg')" >
                        <div class="title" data-slide="six">
                            <span>Calgary Tower 6</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div id="Footer">
        <ul class="navigation">
            <li><a href="PrivacyPolicy.html">Privacy Policy</a></li>
            <li><a href="Disclaimers.html">Disclaimers</a></li>
            <li><a href="GeneralTermsAndConditions.html">General Terms and Conditions</a></li>
            <li><a href="NewsAndAnnouncements.html">News and Announcements</a></li>
            <li><a href="SiteMap.html">Site Map</a></li>
        </ul>
        <div class="copyright">&copy; 2012 Custom Metal Contracting Ltd.  All rights reserved.</div>
    </div>
    <div id="Output">output</div>
</body>
</html>