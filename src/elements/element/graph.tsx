const rawHtml = `
 <script>
	jQuery(document).ready(function() {
	Morris.Line({
        element: 'line_chart',
        data: <!-- php: = $results --> ,
        xkey: "dayofmonth",
        ykeys: ["counts"],
        labels: ["Patient Visits"],
    pointSize: 3,
    fillOpacity: 0,
    pointStrokeColors: ['#222222'],
    behaveLikeLine: true,
    gridLineColor: '#e0e0e0',
    lineWidth: 2,
    hideHover: 'auto',
    lineColors: ['#ffae42'],
    resize: true
    });
	
});
</script>
`;

export default function ElementElementGraph() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
