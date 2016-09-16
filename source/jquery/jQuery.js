/**
 * Created by Jan on 16.9.2016.
 */
import $ from 'jquery';

export default   $(document).ready(() => {
    if ($(".login-slide").css("right") != "0px"){
      $("#children").animate({"right": "100%"}, 400);
      $(".login-slide").animate({"right": "0%"}, 400);
    } else {
      $("#children").animate({"right": "0%"}, 400);
      $(".login-slide").animate({"right": "-100%"}, 400);
    }
  })

