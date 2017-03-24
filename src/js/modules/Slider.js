/**
 * Example module using jQuery and slick slider.
 *
 * Notes:
 *   jQuery is used in the example but the project is not concreate to jQuery.
 */
import $ from 'jquery'
import 'slick-carousel'

const slider = $('.slider')

!slider.hasClass('slick-initialized') && slider.slick()
