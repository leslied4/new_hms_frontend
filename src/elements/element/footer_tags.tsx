const rawHtml = `

	
	 <!-- start js include path -->
	<!-- php: = $this->Html->script('../assets/plugins/jquery/jquery-migrate-3.0.0.min.js') -->
	<!-- php: = $this->Html->script('../assets/plugins/jquery-ui/jquery-ui.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/popper/popper.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/jquery-blockui/jquery.blockui.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/jquery-slimscroll/jquery.slimscroll.js') -->
	<!-- bootstrap -->
	<!-- php: =$this->Html->script('../assets/plugins/bootstrap/js/bootstrap.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker-init.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/bootstrap-select/js/bootstrap-select.min.js') -->
	<!-- counterup -->
	<!-- php: =$this->Html->script('../assets/plugins/counterup/jquery.waypoints.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/counterup/jquery.counterup.min.js') -->
	<!-- Common js-->
	<!-- php: =$this->Html->script('../assets/js/app.js') -->
	<!-- php: =$this->Html->script('../assets/js/layout.js') -->
	<!-- php: =$this->Html->script('../assets/js/theme-color.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/jquery-validation/js/jquery.validate.min.js') -->
	<!-- material -->
	<!-- php: =$this->Html->script('../assets/plugins/material/material.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/bootstrap-material-datetimepicker.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/dropzone/dropzone.js') -->
	
	<!-- dropzone -->

	<!-- data tables -->
	<!-- <!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') --> -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->

	<!-- php: =$this->Html->script('../assets/plugins/summernote/summernote.min.js') -->

	
	<!-- php: =$this->Html->script('../assets/plugins/fullcalendar/fullcalendar.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/calendar/calendar.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/sortable/sortable.min.js') -->

	<!-- php: // $this->Html->script("../assets/plugins/pnotify/dist/pnotify.js") -->
	<!-- php: // $this->Html->script("../assets/plugins/pnotify/dist/pnotify.buttons.js") --> 



<script>
	setInterval(() => {
		var now = new Date();
		now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
		document.getElementById('curtime').value = now.toISOString().slice(0,16);
	}, 100);

	var inst = mobiscroll.eventcalendar('#demo-daily-events', {
		theme: 'ios',
		themeVariant: 'light',
		data: <!-- php: = json_encode($schedules_data) -->,
		view: {
			calendar: { type: 'week' },
			agenda: { type: 'day' }
		},
		onEventClick: function (event, inst) {
			mobiscroll.toast({
				message: event.event.title
			});
		}
	});

	$.ajax({
		type: 'GET',
		url: "<!-- php: echo $this->Url->build( [ 'controller' => 'Institutions', 'action' => 'getUri' ] ); -->",
		cache: false,
		success: function (response){
			current_url = window.location.href
			split = current_url.split("/");
			uri_captured = split[3]
			if(uri_captured !== response && uri_captured !== 'institution-mgr'){
				login_url = '/'+response+'/users/login'
				setTimeout(function(){ 
					$(location).attr('href', login_url);
				}, 1000);
				alertify.error('unauthorized')
			}
		}
	});
</script>

<script>
	var xData = [];
	var sugar1Data = [];
	var sugar2Data = [];
	var temperatureData = [];
	var pulseData = [];
	var spoData = [];
	var bloodPressureData = [];
	var hasRendered = false;

	<!-- php: if (isset($allVitals)): foreach($allVitals as $vital) { -->
			xData.push('<!-- php: = $vital->date_created->format('Y-m-d H:i') -->');
			sugar1Data.push('<!-- php: = $vital->fasting_blood_sugar -->');
			sugar2Data.push('<!-- php: = $vital->random_blood_sugar -->');
			pulseData.push('<!-- php: = $vital->pulse -->');
			temperatureData.push('<!-- php: = $vital->temperature -->');
			spoData.push('<!-- php: = $vital->oxygen_saturation -->');
			bloodPressureData.push(['40', '<!-- php: = $vital->blood_pressure_2 -->', '<!-- php: = $vital->blood_pressure_1 -->', '160']);
	<!-- php: } endif; -->

</script>
<!-- <script src="<!-- php: // $this->Url->script('../assets/plugins/echarts/echarts.js') -->"></script> -->
<!-- php: = $this->Html->script('../assets/js/pages/visit_space/visit_space_footer.js') -->
`;

export default function ElementElementFooterTags() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
