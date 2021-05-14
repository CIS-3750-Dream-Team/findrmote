/* index.js
 * February 28, 2021
 * Extra event handlers
 */

$(() => {
  // Handlers for multi-level Dropdown component
  // https://stackoverflow.com/questions/44467377/bootstrap-4-multilevel-dropdown-inside-navigation
  $('body').on('click', '.dropdown-menu .dropdown-toggle', function (e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
    }

    $(this).next('.dropdown-menu').toggleClass('show');

    $(this).parents('.dropdown.show').on('hidden.bs.dropdown', function (e) {
      $('.dropdown-submenu .show').removeClass('show');
    });

    return false;
  });
})
