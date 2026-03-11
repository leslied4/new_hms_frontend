const rawHtml = `
<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestLabs', 'action' => 'processLabs', $patientVisit->id], 'class' => 'form-horizontal', 'id' => 'labProcessForm']) -->

<div class="lab-results-container">
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
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
        <!-- php: foreach([$requestLab] as $requestLab) { -->
          <!-- php: // Skip cancelled requests if($requestLab->status_id == 24) { continue; } -->
          <tr class="lab-test-header">
            <td colspan="5" class="bg-light">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0"><!-- php: = $requestLab->lab_test->name --></h5>

              </div>
            </td>
          </tr>
          
          <!-- php: $inputTypes = [ 'Text' => 'Text', 'Number' => 'Number', 'Select' => 'Select', 'TextArea' => 'TextArea' ]; $readOnlyReference = true; // Use the default template if lab has no set template if($defaultTemplate != null && sizeof($requestLab->l... -->
          <tr class="result-row test_<!-- php: = $requestLab->id -->">
            <td>
              <!-- php: = $value->label_name == 'Result' ? $requestLab->lab_test->name : $value->label_name -->
            </td>
            <td>
              <!-- php: if(in_array($value->input_type, ['Text'])) { -->
                <input type="text" value="<!-- php: = $templateResult != null ? $templateResult->normal_value : '' -->" 
                      name="req_<!-- php: = $requestLab->id -->_normal_value_<!-- php: = $value->id -->" class="form-control" />
              <!-- php: } else if(in_array($value->input_type, ['Number'])) { -->
                <input type="number" value="<!-- php: = $templateResult != null ? $templateResult->normal_value : '' -->" 
                      step="0.0000001" name="req_<!-- php: = $requestLab->id -->_normal_value_<!-- php: = $value->id -->" 
                      <!-- php: = isset($value->min_value) ? 'min="'. $value->min_value .'"' : '' --> 
                      <!-- php: = isset($value->max_value) ? 'max="'. $value->max_value .'"' : '' --> class="form-control" />
              <!-- php: } else if(in_array($value->input_type, ['Select'])) { -->
                <SearchableSelectField name="req_<!-- php: = $requestLab->id -->_normal_value_<!-- php: = $value->id -->" class="form-control">
                  <option value="">Select</option>
                  <!-- php: foreach($value->lab_template_select_options as $selectOption) { -->
                    <option <!-- php: = $templateResult != null && $templateResult->normal_value == $selectOption ? 'selected' : '' --> 
                          value="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
                  <!-- php: } -->
                </SearchableSelectField>
              <!-- php: } else if(in_array($value->input_type, ['TextArea'])) { -->
                <textarea name="req_<!-- php: = $requestLab->id -->_normal_value_<!-- php: = $value->id -->" 
                        class="form-control textarea"><!-- php: = $templateResult != null ? $templateResult->normal_value : '' --></textarea>
              <!-- php: } else { -->
                <input type="text" value="<!-- php: = $templateResult != null ? $templateResult->normal_value : '' -->" 
                      name="req_<!-- php: = $requestLab->id -->_normal_value_<!-- php: = $value->id -->" class="form-control" />
              <!-- php: } -->
            </td>
            <td>
              <SearchableSelectField name="req_<!-- php: = $requestLab->id -->_reference_value_<!-- php: = $value->id -->" class="form-control">
                <!-- php: $isOldie = true; foreach($value->lab_template_select_options as $selectOption) { if($selectOption->type == 1) { $isOldie = false; $selected = ''; if ($templateResult != null && ($templateResult->reference_value == $selectOption->reference |... -->
                    <option <!-- php: = $selected --> value="<!-- php: = h($selectOption->reference) -->">
                      <!-- php: = h($selectOption->name) --> (<!-- php: = h($selectOption->reference) -->)
                    </option>
                <!-- php: } } -->

                <!-- php: if($isOldie): -->
                    <!-- php: $selected = ''; if ($templateResult != null && ($templateResult->reference_value == $value->reference)) { $selected = 'selected'; } elseif ($autoSelectRef === 'general_ref') { $selected = 'selected'; } -->
                    <option <!-- php: = $selected --> value="<!-- php: = h($value->reference) -->">
                      general_ref (<!-- php: = h($value->reference) -->)
                    </option>
                <!-- php: endif; -->
              </SearchableSelectField>

            </td>
            <td>
              <input type="text" value="<!-- php: = $templateResult != null ? $templateResult->unit_of_measurement : $value->unit_of_measurement -->" 
                    name="req_<!-- php: = $requestLab->id -->_unit_of_measurement_<!-- php: = $value->id -->" class="form-control" 
                    <!-- php: = isset($value->unit_of_measurement) && trim($value->unit_of_measurement) != '' && $readOnlyReference ? 'readonly' : '' --> />
            </td>
            <td>
              <SearchableSelectField class="form-control" name="req_<!-- php: = $requestLab->id -->_result_flag_<!-- php: = $value->id -->">
                <option value="">Select...</option>
                <!-- php: foreach($resultFlags as $key => $item) { -->
                  <option <!-- php: = $templateResult != null && $templateResult->result_flag_id == $key ? 'selected' : '' --> 
                        value="<!-- php: = $key -->"><!-- php: = h($item) --></option>
                <!-- php: } -->
              </SearchableSelectField>
            </td>
          </tr>
          <!-- php: endforeach; -->
          
          <tr class="comment-row test_<!-- php: = $requestLab->id -->" style="">
            <td>Comment</td>
            <td colspan="4">
              <input type="text" name="req_<!-- php: = $requestLab->id -->_comment" value="<!-- php: = $requestLab->comment -->" 
                    placeholder="Enter comments if any" class="form-control" />
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

<div class="form-actions text-end mt-4">
  <button type="submit" class="btn btn-success">
    <i class="fa fa-save"></i> Submit Results
  </button>
  <button type="button" class="btn btn-secondary" data-dismiss="modal">
    <i class="fa fa-times"></i> Cancel
  </button>
</div>
<!-- php: = $this->Form->end() -->


<script>


    $('#labProcessForm').submit(function(event) {
        event.preventDefault();
        $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: $(this).serialize(),
        success: function(response) {
            // Handle success response
            alertify.log('Lab process form submitted successfully!');
        },
        error: function(xhr, status, error) {
            // Handle error response
            alertify.error('Error submitting lab process form:', error);
        }
        });
    });

</script>
`;

export default function ElementElementRequestLabsBloodchemistry() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
