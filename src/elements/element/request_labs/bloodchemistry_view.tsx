const rawHtml = `
<div class="lab-results-container">
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th width="25%">Test Item</th>
          <th width="25%">Result</th>
          <th width="25%">Reference</th>
          <th width="15%">Unit</th>
          <th width="10%">Flag</th>
        </tr>
      </thead>
      <tbody>
        <!-- php: foreach($requestLabs as $requestLab) { -->
          <!-- php: // Skip cancelled requests if($requestLab->status_id == 24) { continue; } -->
          <tr class="lab-test-header">
            <td colspan="5" class="bg-light">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0"><!-- php: = $requestLab->lab_test->name --></h5>

              </div>
            </td>
          </tr>
          
          <!-- php: $inputTypes = [ 'Text' => 'Text', 'Number' => 'Number', 'Select' => 'Select', 'TextArea' => 'TextArea' ]; $readOnlyReference = true; // Use the default template if lab has no set template if($defaultTemplate != null && sizeof($requestLab->l... -->
          <tr class="result-row test_<!-- php: = $requestLab->id -->" style="border: none">
            <td style="border: none">
              <!-- php: = $value->label_name == 'Result' ? $requestLab->lab_test->name : $value->label_name -->
            </td>
            <td style="border: none">
              <!-- php: = $templateResult != null ? $templateResult->normal_value : '' -->
            </td>
            <td style="border: none">
              <!-- php: = $templateResult != null ? $templateResult->reference_value : $value->reference -->
            </td>
            <td style="border: none">
              <!-- php: = $templateResult != null ? $templateResult->unit_of_measurement : $value->unit_of_measurement -->
            </td>
            <td style="border: none">
              <!-- php: = $templateResult != null ? $resultFlagers[$templateResult->result_flag_id] : '' -->
            </td>
          </tr>
          <!-- php: endforeach; -->
          
          <tr class="comment-row test_<!-- php: = $requestLab->id -->" style="<!-- php: = $templateResult == null ? 'display: none' : '' -->">
            <td>Comment</td>
            <td colspan="4">
              <!-- php: = $requestLab->comment -->
            </td>
          </tr>
        <!-- php: } -->
      </tbody>
    </table>
  </div>
</div>



<div class="row mt-4">
  <div class="col-md-6">
    <div class="form-group row">
      <label class="col-md-4 col-form-label">Recorded By:</label>
      <div class="col-md-8">
        <p class="form-control-static"><!-- php: = isset($templateResult->user) ? $templateResult->user->full_name : '' --></p>
      </div>
    </div>
    
    <div class="form-group row">
      <label class="col-md-4 col-form-label">Date Drawn:</label>
      <div class="col-md-8">
        <p class="form-control-static"><!-- php: = isset($templateResult->date_created) ? $templateResult->date_created->nice() : '' --></p>
      </div>
    </div>
  </div>
</div>

<hr/>
`;

export default function ElementElementRequestLabsBloodchemistryView() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
