const rawHtml = `
<style>
/* CONTAINER */
.review-container {
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    padding: 15px;
    background: #fafafa;
    font-family: sans-serif;
}

/* TITLES & HEADERS */
.review-container .section-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
}

/* RECENTLY USED SECTION */
.review-container .recent-section {
    margin-bottom: 20px;
}

.review-container .recent-title {
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 6px;
}

.review-container .recent-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.review-container .recent-chips .chip {
    background: #eef2ff;
    border: 1px solid #cbd5ff;
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 13px;
    cursor: pointer;
}

/* GRID – FIXED SO CARDS DO NOT EQUALIZE HEIGHTS */
.review-container .tiles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    align-items: flex-start; /* THIS FIXES THE HEIGHT ISSUE */
}

/* TILE CARD */
.review-container .tile {
    background: #f5f7ff;
    border: 1px solid #d2d9ff;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    height: auto;                /* FIX FOR AUTO HEIGHT */
    align-self: flex-start;      /* FIX FOR AUTO HEIGHT */
}

.review-container .tile:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.review-container .tile-icon {
    font-size: 28px;
    margin-bottom: 8px;
}

.review-container .tile-title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;
}

.review-container .tile-count {
    font-size: 12px;
    color: #555;
}

/* PANEL IN EXPANDED TILE */
.review-container .tile-panel {
    display: none;
    margin-top: 12px;
    text-align: left;
}

/* UNIFORM-SIZED BUTTONS INSIDE PANEL */
.review-container .tile-panel button {
    background: #fff;
    border: 1px solid #d2d9ff;
    border-radius: 10px;
    padding: 8px 10px;

    width: 100%;     /* ensures all buttons same width */
    height: 40px;    /* consistent height */
    text-align: center;
    white-space: nowrap;

    margin-top: 6px;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.2s;
}

.review-container .tile-panel button:hover {
    background: #e4e9ff;
}

/* SECTION (if used elsewhere) */
.review-container .section {
    border-radius: 16px;
    padding: 12px;
    margin-bottom: 12px;
    background: #fff;
    transition: all 0.25s ease;
}

.review-container .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.review-container .section-body {
    margin-top: 8px;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
}

.review-container .section-body.collapsed {
    max-height: 0;
    opacity: 0;
}

.review-container .section-body.expanded {
    max-height: 500px;
    opacity: 1;
}

/* ACTION BUTTONS (if used) */
.review-container .action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.review-container .action-buttons button {
    height: 42px;
    padding: 0 16px;
    border-radius: 12px;
    flex: 1;
    min-width: 120px;
}


</style>
<div class="modal fade" id="system_review_modal" tabindex="-1" role="dialog" aria-labelledby="select"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">System Review:
					<!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" id="system_review_modal_body">

			</div>
		</div>
	</div>
</div>

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Review of Systems/Examinations </span>
			</div>
			<ul class="nav nav-tabs" id="requestTab">
				<li class="nav-item request_lab">
					<a href="#showReviewHistory" data-toggle="tab">History</a>
				</li>

				<li class="nav-item request_lab">
					<a href="#showReviewUpdate" data-toggle="tab">Current Review</a>
				</li>


			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane request_lab_content" id="showReviewHistory">
					<i class="text-muted text-italics">
						Documented relevant past medical reviews related to the complaints. Included any abnormalities or pertinent negatives.
					</i>
					<div id="viewCol">
						<div id="reviewList" class="row justify-content-between"></div>
					</div>
				</div>

				<div class="tab-pane " id="showReviewUpdate">
					<i class="text-muted text-italics">
						Record the patient’s current symptoms and concerns. Perform a systematic review of major body systems, noting any abnormalities or pertinent negatives. Use our structured fields for clarity (eg., Cardiovascular: No chest pain, Respiratory: Mild shortness of breath, etc.).
					</i>
					<div id="addReviewCollapse" style="">
					</div>
				</div>

			</div>
		</div>
	</div>
</div>

<script>
	const review_of_systems_patient_id = "<!-- php: = $selectedVisit->patient_id -->"
	const review_of_systems_visit_id = "<!-- php: = $selectedVisit->id -->"

	const getLatestSystemReview_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getReviewOfSystems' ] ); -->"
	const editSystemReviewEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'systemReviewEdit', $selectedVisit->patient_id, $selectedVisit->id ] ); -->"
</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/review_of_symptoms.js') -->

<script>
	const categoryItems = {
        general: [
            ["General", 'gene_tab'],
            ['Groin', 'groin_tab'], ['Abdomen', 'abdomen_tab'], 
            ["Hands", 'hands_tab'], ["Breast", 'breast_tab'],
        ],
        head_neck: [
            ["Eyes", 'eyes_tab'], ["Nose", 'nose_tab'], 
            ["Mouth", 'mouth_tab'], ["Neck", 'neck_tab'],
        ],
        musculoskeletal: [
            ["Joint noises", 'musco_skeletal_joint_noises_tab'],
            ["Joint stiffness", 'musco_skeletal_joint_stiffness_tab'],
            ["Difficulty moving", 'musco_skeletal_difficulty_moving_tab'],
            ["Pain", 'musco_skeletal_pain_tab'],
            ["Single joint", 'musco_skeletal_single_joint_tab'],["Many joints", 'musco_skeletal_many_joint_tab']],
        female_exam: [
            ["Gynaecologic exam", 'gynaecologic_tab'],
            ["Abdomen exam", 'obstetric_abdomen_tab'],
            ["Pelvic exam", 'obstetric_pelvic_tab']],
        cardiorespiratory: [["Cardiovascular", 'cardio_tab'],["Respiratory", 'res_tab']],
        extremities: [["Extremity", 'extermity_tab'],["Respiratory", 'res_tab']],
        neurology: [["Nerological", 'nerological_tab']],
    };


    function togglePanel(tile, category) {
        const panel = tile.querySelector('.tile-panel');

        // Toggle visibility
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
            return;
        }

        // Close other panels
        document.querySelectorAll('.tile-panel').forEach(p => p.style.display = 'none');

        // Populate items
        panel.innerHTML = '';
        categoryItems[category].forEach(item => {
            const btn = document.createElement('button');
            btn.textContent = item[0];
            btn.onclick = e => {
                e.stopPropagation();
                selectReview(item, panel);
            };
            panel.appendChild(btn);
        });

        panel.style.display = 'block';
    }

    function selectReview(le_item, panel) {
        item = le_item[0];
        updateReview(le_item[1]); // Your existing function

        if (panel.style.display === 'block') {
            panel.style.display = 'none';
            return;
        }
    }

</script>
`;

export default function ElementElementPatientvisitReviewOfSystems() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
