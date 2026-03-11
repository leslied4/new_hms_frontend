import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisits/clinical_pathways.php';
const rawHtml = `
<style>
    .clinical-pathways-header * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .clinical-pathways-header {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    }

    .clinical-pathways-header .header {
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        color: white;
        padding: 2rem 0;
        position: relative;
        overflow: hidden;
    }

    .clinical-pathways-header .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    }

    .clinical-pathways-header .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        position: relative;
        z-index: 1;
    }

    .clinical-pathways-header .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1.5rem;
    }

    .clinical-pathways-header .logo-section {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .clinical-pathways-header .logo {
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .clinical-pathways-header .logo svg {
        width: 28px;
        height: 28px;
        fill: white;
    }

    .clinical-pathways-header .header-text h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .clinical-pathways-header .header-text p {
        font-size: 1rem;
        opacity: 0.9;
        font-weight: 400;
    }

    .clinical-pathways-header .header-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .clinical-pathways-header .search-box {
        position: relative;
    }

    .clinical-pathways-header .search-box input {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        color: white;
        font-size: 0.9rem;
        width: 280px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    }

    .clinical-pathways-header .search-box input::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    .clinical-pathways-header .search-box input:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }

    .clinical-pathways-header .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        fill: rgba(255, 255, 255, 0.7);
    }

    .clinical-pathways-header .filter-btn {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .clinical-pathways-header .filter-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
    }

    .clinical-pathways-header .pathway-nav {
        background: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        padding: 1.5rem 0;
        border-bottom: 1px solid #e2e8f0;
    }

    .clinical-pathways-header .nav-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .clinical-pathways-header .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #64748b;
        font-size: 0.9rem;
    }

    .clinical-pathways-header .breadcrumb a {
        color: #2563eb;
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .clinical-pathways-header .breadcrumb a:hover {
        color: #1d4ed8;
    }

    .clinical-pathways-header .breadcrumb-separator {
        color: #cbd5e1;
        margin: 0 0.25rem;
    }

    .clinical-pathways-header .pathway-stats {
        display: flex;
        gap: 2rem;
        align-items: center;
        color: #64748b;
        font-size: 0.9rem;
    }

    .clinical-pathways-header .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .clinical-pathways-header .stat-number {
        font-weight: 600;
        color: #1e293b;
    }

    @media (max-width: 768px) {
        .clinical-pathways-header .header-content {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .clinical-pathways-header .search-box input {
            width: 100%;
            min-width: 250px;
        }
        
        .clinical-pathways-header .nav-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
    }
    .clinical-pathways-header .navigation {
        display: flex;
        margin-top: 40px;
        padding: 20px;
        justify-content:end;
        border-top: 1px solid #e1e5e9;
    }

    .clinical-pathways-header .navigation .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .clinical-pathways-header .navigation .btn-secondary {
        background: #e1e5e9;
        color: #4a5568;
    }

    .clinical-pathways-header .navigation .btn-primary {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
    }
</style>
<style>
    .medical-container {
        max-width: 800px;
        margin: 20px auto;
        font-family: Arial, sans-serif;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 20px;
    }

    .medical-container .section {
        margin-bottom: 25px;
        padding: 15px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
    }

    .medical-container .section h3 {
        margin: 0 0 15px 0;
        color: #333;
        border-bottom: 2px solid #007bff;
        padding-bottom: 5px;
    }

    .medical-container .tag {
        display: inline-block;
        background: #007bff;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        margin: 2px;
        font-size: 14px;
    }

    .medical-container .item {
        background: #f8f9fa;
        padding: 10px;
        margin: 8px 0;
        border-radius: 4px;
        border-left: 3px solid #007bff;
    }

    .medical-container .diagnosis {
        background: #dc3545;
    }

    .medical-container .empty {
        color: #666;
        font-style: italic;
        padding: 10px;
    }
</style>
<div class="clinical-pathways-header">
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo-section">
                    <div class="logo">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            <path d="M12 6v12l-5.18 2.73L8 14.14 3 9.27l5.91-.84L12 6z" opacity="0.6"/>
                        </svg>
                    </div>
                    <div class="header-text">
                        <h1>Clinical Pathways</h1>
                        <p>Evidence-based care guidelines and protocols</p>
                    </div>
                </div>
                
                <div class="header-actions d-none">
                    <div class="search-box">
                        <svg class="search-icon" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        <input type="text" placeholder="Search pathways, conditions, treatments...">
                    </div>
                    <button class="filter-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                        Filter
                    </button>
                </div>
            </div>
        </div>
    </header>
    

    <!-- php: = $this->Form->create(null, [ 'url' => ['controller' => 'PatientVisits', 'action' => 'addVisitPathway', $patient_id, $visit_id], 'class' => '', 'onsubmit' => 'return validatePathwaySelection()' ]); -->
        <div id="pathwayDetails" class="row medical-container m-4">

        </div>

        <div class="navigation">
            <button type="button" data-dismiss="modal" class="btn btn-secondary" onclick="previousStep()" id="prevBtn">Close</button>
            <button type="submit" class="btn btn-info" id="submitBtn" disabled style="opacity: 0.6; cursor: not-allowed;">Submit</button>
        </div>
    <!-- php: =$this->Form->end(); -->

</div>

<script>
    var pathways = <!-- php: = json_encode($pathways) -->;
    function displayAvailablePathways(params) {
        
        pathways.forEach((all_path, index) => {
            path = all_path[1]
            $('#pathwayDetails').append(\`
                <div class="col-md-12 mb-2">
                    <div class="border" onclick="togglePathwayAccordion('\${path['step1'].title.split(' ').join('_')}\${index}')" style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                        <label class="" style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="\${all_path[0]}_id" name="pathways[]" value="\${all_path[0]}" style="accent-color: #264E5B; width: 18px; height: 18px;" onclick="event.stopPropagation()" required>
                            <span style="font-size: 16px; font-weight: bold;">\${path['step1'].title}</span>
                        </label>
                    </div>
                    <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;font-weight: normal;" id="\${path['step1'].title.split(' ').join('_')}\${index}">
                        <div class="">
                            <div class="row">
                                \${render(path)}
                            </div>
                        </div>
                    </div>
                </div>
            \`)
        });
        if (pathways.length < 1) {
            $('#pathwayDetails').html("No Pathways Meet Requirements")
        }
    }
    function render(data) {
      const container = document.getElementById('step5container');
      let html = '';

      // Step 1
      html += \`
          <div class="section">
              <h3>\${data.step1.title}</h3>
              <p><strong>Specialties:</strong> \${data.step1.specialties.map(s => \`<span class="tag">\${s.name}</span>\`).join('')}</p>
              <p><strong>Genders:</strong> \${data.step1.genders.map(g => \`<span class="tag">\${g.name}</span>\`).join('')}</p>
              <p><strong>Ages:</strong> \${data.step1.ageSpecifications.map(a => \`<span class="tag">\${a.age}</span>\`).join('')}</p>
          </div>
      \`;

      // Step 2
      html += \`
          <div class="section">
              <h3>Assessment</h3>
              <p><strong>Vitals:</strong> \${data.step2.vitals.length > 0 ? data.step2.vitals.join(', ') : '<span class="empty">None recorded</span>'}</p>
              <p><strong>Complaints:</strong></p>
              \${data.step2.odqs.map(odq => \`
                  <div class="item">
                      \${odq.name} - Severity: \${odq.severity}, Duration: \${odq.duration}
                  </div>
              \`).join('')}
              <p><strong>Diagnoses:</strong> \${data.step2.diagnosis.map(d => \`<span class="tag diagnosis">\${d.name}</span>\`).join('')}</p>
          </div>
      \`;

      // Step 3
      html += \`
          <div class="section">
              <h3>Treatment</h3>
              \${data.step3.map(t => \`
                  <div class="item">
                      <strong>\${t.type.name}</strong> - Qty: \${t.quantity}, Cost: $\${t.unitCost}
                  </div>
              \`).join('')}
          </div>
      \`;

      // Step 4
      html += \`
          <div class="section">
              <h3>Documentation</h3>
              \${data.step4?.triage?.details?.length || 0 > 0 ? 
                  data.step4.triage.details.map(t => \`<div class="item"><strong>\${t.title}:</strong> \${t.notes}</div>\`).join('') : 
                  '<div class="empty">No triage notes</div>'
              }
              <p><strong>Records:</strong> Clinical Notes (\${data.step4.clinical_notes?.details?.length || 0}), ROS Exam (\${data.step4.ros_exam?.details?.length || 0}), Follow-ups (\${data.step4.followups?.details?.length || 0})</p>
          </div>
      \`;

      return html;
    }
</script>
<script>
    function validatePathwaySelection() {
        const pathwayCheckboxes = document.querySelectorAll('input[name="pathways[]"]');
        let atLeastOneSelected = false;
        
        pathwayCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                atLeastOneSelected = true;
            }
        });
        
        if (!atLeastOneSelected) {
            alert('Please select at least one clinical pathway before submitting.');
            return false;
        }
        
        return true;
    }

    // Optional: Add real-time validation feedback
    function tagPathways() {
        const checkboxes = document.querySelectorAll('input[name="pathways[]"]');
        const submitBtn = document.getElementById('submitBtn');
        
        function checkSelection() {
            let selected = false;
            checkboxes.forEach(cb => {
                if (cb.checked) selected = true;
            });
            
            // Disable/enable submit button based on selection
            submitBtn.disabled = !selected;
            submitBtn.style.opacity = selected ? '1' : '0.6';
            submitBtn.style.cursor = selected ? 'pointer' : 'not-allowed';
        }
        
        // Add event listeners to all checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', checkSelection);
        });
        
        // Initial check
        checkSelection();
    }

    displayAvailablePathways()
    tagPathways()
</script>
`;

export default function PatientVisitsClinicalPathwaysPage() {
  return (
    <PageShell title="PatientVisits/clinical_pathways.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
