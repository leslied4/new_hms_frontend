const rawHtml = `
<div style="width: 100%; font-family: Arial, sans-serif; font-size: 13px; margin-bottom: 20px;">
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="width:25%; text-align:left; border:1px solid #ccc; padding:8px;">Test Item</th>
          <th style="width:25%; text-align:left; border:1px solid #ccc; padding:8px;">Result</th>
          <th style="width:25%; text-align:left; border:1px solid #ccc; padding:8px;">Reference</th>
          <th style="width:15%; text-align:left; border:1px solid #ccc; padding:8px;">Unit</th>
          <th style="width:10%; text-align:left; border:1px solid #ccc; padding:8px;">Flag</th>
        </tr>
      </thead>
      <tbody>
        <!-- php: if($requestLab->status_id != 24) { -->

          <!-- php: $inputTypes = [ 'Text' => 'Text', 'Number' => 'Number', 'Select' => 'Select', 'TextArea' => 'TextArea' ]; $readOnlyReference = true; if($defaultTemplate != null && sizeof($requestLab->lab_test->lab_templates) <= 0) { array_push($requestLab-... -->
          <tr style="border:none;">
            <td style="border:1px solid #ccc; padding:8px;">
              <!-- php: = $value->label_name == 'Result' ? $requestLab->lab_test->name : (isset($value->label_name) ? $value->label_name : $value->lab_template->label_name) -->
            </td>
            <td style="border:1px solid #ccc; padding:8px;">
              <!-- php: = $templateResult != null ? $templateResult->normal_value : '' -->
            </td>
            <td style="border:1px solid #ccc; padding:8px;">
              <!-- php: = $templateResult != null ? $templateResult->reference_value : $value->reference -->
            </td>
            <td style="border:1px solid #ccc; padding:8px;">
              <!-- php: = $templateResult != null ? $templateResult->unit_of_measurement : $value->unit_of_measurement -->
            </td>
            <td style="border:1px solid #ccc; padding:8px;">
              <!-- php: = $templateResult != null && isset($resultFlagers[$templateResult->result_flag_id]) ? $resultFlagers[$templateResult->result_flag_id] : '' -->
            </td>
          </tr>
          <!-- php: endforeach; -->
          
          <tr style="<!-- php: = $templateResult == null ? 'display:none;' : '' -->">
            <td style="border:1px solid #ccc; padding:8px; font-weight:bold;">Comment</td>
            <td colspan="4" style="border:1px solid #ccc; padding:8px;">
              <!-- php: = $requestLab->comment -->
            </td>
          </tr>
        <!-- php: } -->
      </tbody>
    </table>
  </div>
</div>

<div style="margin-top: 30px; font-family: Arial, sans-serif; font-size: 13px;">
  <div style="width: 50%; float: left;">
    <div style="margin-bottom: 10px;">
      <label style="display: inline-block; width: 40%; font-weight: bold;">Recorded By:</label>
      <span style="display: inline-block; width: 58%;">
        <!-- php: = isset($templateResult->user) ? $templateResult->user->full_name : '' -->
      </span>
    </div>
    
    <div style="margin-bottom: 10px;">
      <label style="display: inline-block; width: 40%; font-weight: bold;">Date Drawn:</label>
      <span style="display: inline-block; width: 58%;">
        <!-- php: = isset($templateResult->date_created) ? $templateResult->date_created->nice() : '' -->
      </span>
    </div>
  </div>
</div>

<div style="clear: both; margin-top: 20px; border-top: 1px solid #ccc;"></div>

`;

export default function ElementElementRequestLabsEmailBloodchemistryViewReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
