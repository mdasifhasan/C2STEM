/**
 * Created by hasanm on 5/9/2017.
 */
function conceptual_model_load_views(parent_id) {
    console.log("conceptual_model_load_views", parent_id)
    $('#'+parent_id).load('modules/conceptual_model/view_conceptual_model.html');
}

$( '#module_conceptual_model' ).on( 'click', '.dropdown-menu li', function( event ) {

    var $target = $( event.currentTarget );

    $target.closest( '.btn-group' )
        .find( '[data-bind="label"]' ).text( $target.text() )
        .end()
        .children( '.dropdown-toggle' ).dropdown( 'toggle' );

    return false;

});