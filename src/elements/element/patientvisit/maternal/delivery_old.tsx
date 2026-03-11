const rawHtml = `
<!-- php: // <a id="update_delivery_button" class="btn btn-sm btn-$theme2" onclick="$('#no_delivery_div, #delivery_details_div, #update_delivery_button').hide(0);$('#update_delivery_div,#view_delivery_button').show({ direction: 'top' }, 2000)">Update... -->

<div class="col-md-12">
    <div class="card-head legend-head">
        <header>Delivery</header>
        <!-- php: if(null !==($valueObject) && $valueObject != null) { -->
            <div style="float: right;">
                <a id="update_delivery_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_div, #delivery_details_div, #update_delivery_button').hide(0);$('#update_delivery_div,#view_delivery_button').show({ direction: 'top' }, 3000)">Update Delivery</a>
                <a id="view_delivery_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_div, #delivery_details_div, #update_delivery_button').show({ direction: 'top' }, 3000);$('#update_delivery_div,#view_delivery_button').hide(0);" style="display: none;">View Details</a>
            </div>
        <!-- php: } -->
    </div>

    <div class="card card-box" id="update_delivery_div" style="display: none;">
    </div>

    <!-- php: if(!isset($valueObject) || $valueObject == null) { -->
        <div class="card card-box" id="no_delivery_div">
            <div class="card-body no-padding height-9">
                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">Current delivery details not set</h3>
            </div>
        </div>
    <!-- php: } else { -->
        <div class="card card-box" id="delivery_details_div">
			<div class="card-body no-padding height-9">
                <ul class="list-group list-group-unbordered">
                    <li class="list-group-item">
                        <b>Date Conceived</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->has('date_conceived') ? $valueObject->date_conceived->i18nFormat('d/MM/Y') : '' --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Mode of Conception</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->mode_of_conception --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Last Menstrual Period</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->has('last_menstrual_period') ? $valueObject->last_menstrual_period->i18nFormat('d/MM/Y') : '' --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Estimated Date of Delivery</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->has('edd') ? $valueObject->edd->i18nFormat('d/MM/Y') : '' --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Weight</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->weight --> KG</div>
                    </li>
                    <li class="list-group-item">
                        <b>Height</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->height --> cm</div>
                    </li>
                    <li class="list-group-item">
                        <b>BMI</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->bmi --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Estimated Weight at EDD</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->weight_edd --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Contrapception used before Pregnancy</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->contraception_type --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Mode of Delivery</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->mode_of_delivery --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Outcome</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->outcome --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Pregnancy Complications</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->pregnancy_complications --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Sex</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->has('gender') ? $valueObject->gender->name : '' --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Weight</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->weight --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Current Info On Child</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->child_info --></div>
                    </li>
                </ul>
            </div>
        </div>
    <!-- php: } -->
</div>

`;

export default function ElementElementPatientvisitMaternalDeliveryOld() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
