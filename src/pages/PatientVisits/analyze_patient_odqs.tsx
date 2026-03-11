import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisits/analyze_patient_odqs.php';
const rawHtml = `

<div class="symptom-dashboard">
    <style scoped>
        .symptom-dashboard {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f8fafc;
            min-height: 100vh;
            padding: 1rem;
        }

        .symptom-dashboard .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .symptom-dashboard h1 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 2rem;
            text-align: center;
        }

        .symptom-dashboard .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .symptom-dashboard .full-width {
            grid-column: span 2;
        }

        .symptom-dashboard .card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .symptom-dashboard .card h2 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 1rem;
        }

        .symptom-dashboard .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .symptom-dashboard .badge.low {
            background: #dcfce7;
            color: #166534;
        }

        .symptom-dashboard .badge.moderate {
            background: #fef3c7;
            color: #92400e;
        }

        .symptom-dashboard .badge.high {
            background: #fecaca;
            color: #991b1b;
        }

        .symptom-dashboard .stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-top: 1rem;
        }

        .symptom-dashboard .stat {
            text-align: center;
        }

        .symptom-dashboard .stat-number {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e293b;
        }

        .symptom-dashboard .stat-label {
            font-size: 0.875rem;
            color: #64748b;
            margin-top: 0.25rem;
        }

        .symptom-dashboard .chart {
            width: 100%;
            height: 400px;
        }

        .symptom-dashboard .pattern {
            padding: 1rem;
            border-left: 3px solid #e5e7eb;
            margin-bottom: 0.75rem;
            background: #f9fafb;
        }

        .symptom-dashboard .pattern.high {
            border-left-color: #ef4444;
        }

        .symptom-dashboard .pattern.moderate {
            border-left-color: #f59e0b;
        }

        .symptom-dashboard .pattern-title {
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.5rem;
        }

        .symptom-dashboard .pattern-desc {
            font-size: 0.875rem;
            color: #6b7280;
        }

        .symptom-dashboard .no-patterns {
            text-align: center;
            color: #9ca3af;
            font-style: italic;
            padding: 2rem;
        }

        @media (max-width: 768px) {
            .symptom-dashboard .grid {
                grid-template-columns: 1fr;
            }
            
            .symptom-dashboard .full-width {
                grid-column: span 1;
            }
            
            .symptom-dashboard .stats {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .symptom-dashboard .chart {
                height: 300px;
            }
        }
    </style>

    <div class="container">
        <h1>Symptom Analysis</h1>

        <div class="grid">
            <div class="card full-width">
                <h2>Risk Level</h2>
                <div id="riskBadge"></div>
                <div class="stats" id="riskStats"></div>
            </div>

            <div class="card full-width">
                <h2>Symptom Severity</h2>
                <div id="chart" class="chart"></div>
            </div>
            <div class="card full-width">
                <h2>Patterns</h2>
                <div id="patterns"></div>
            </div>
        </div>
    </div>

</div>

<script>
    // Sample data
    sampleOdqs = <!-- php: = json_encode($odqs) -->;


    function getAverages(data) {
        const scores = { 'mild': 1, 'moderate': 2, 'severe': 3 };
        const grouped = {};

        data.forEach(item => {
            if (!grouped[item.odq_id]) {
                grouped[item.odq_id] = {
                    name: item.name,
                    total: 0,
                    count: 0,
                    severity: item.severity
                };
            }
            grouped[item.odq_id].total += scores[item.severity] || 0;
            grouped[item.odq_id].count++;
        });

        return Object.values(grouped).map(item => ({
            ...item,
            average: item.total / item.count
        }));
    }

    function analyze(data) {
        const total = data.length;
        const severe = data.filter(d => d.severity === 'severe').length;
        const moderate = data.filter(d => d.severity === 'moderate').length;
        const mild = data.filter(d => d.severity === 'mild').length;

        // Risk level
        let risk = 'low';
        if (severe / total > 0.3) risk = 'high';
        else if (severe / total > 0.15) risk = 'moderate';

        document.getElementById('riskBadge').innerHTML = 
            \`<span class="badge \${risk}">\${risk.toUpperCase()} RISK</span>\`;

        document.getElementById('riskStats').innerHTML = \`
            <div class="stat">
                <div class="stat-number">\${total}</div>
                <div class="stat-label">Total</div>
            </div>
            <div class="stat">
                <div class="stat-number">\${severe}</div>
                <div class="stat-label">Severe</div>
            </div>
            <div class="stat">
                <div class="stat-number">\${moderate}</div>
                <div class="stat-label">Moderate</div>
            </div>
            <div class="stat">
                <div class="stat-number">\${mild}</div>
                <div class="stat-label">Mild</div>
            </div>
        \`;

        // Patterns
        const patterns = [];
        const symptoms = {};
        
        data.forEach(d => {
            if (!symptoms[d.name]) symptoms[d.name] = [];
            symptoms[d.name].push(d);
        });

        Object.entries(symptoms).forEach(([name, entries]) => {
            const severeCount = entries.filter(e => e.severity === 'severe').length;
            if (severeCount >= 2) {
                patterns.push({
                    title: 'Critical Alert',
                    desc: \`\${name} has \${severeCount} severe cases\`,
                    priority: 'high'
                });
            } else if (entries.length >= 2) {
                patterns.push({
                    title: 'Recurring',
                    desc: \`\${name} occurred \${entries.length} times\`,
                    priority: 'moderate'
                });
            }
        });

        const patternsDiv = document.getElementById('patterns');
        if (patterns.length === 0) {
            patternsDiv.innerHTML = '<div class="no-patterns">No patterns found</div>';
        } else {
            patternsDiv.innerHTML = patterns.map(p => \`
                <div class="pattern \${p.priority}">
                    <div class="pattern-title">\${p.title}</div>
                    <div class="pattern-desc">\${p.desc}</div>
                </div>
            \`).join('');
        }
    }

    function createChart(averages) {
        const chart = echarts.init(document.getElementById('chart'));
        
        chart.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: averages.map(a => a.name.substring(0, 20) + (a.name.length > 20 ? '...' : ''))
            },
            yAxis: {
                type: 'value',
                max: 3,
                min: 0
            },
            series: [{
                type: 'bar',
                data: averages.map(a => ({
                    value: a.average.toFixed(1),
                    itemStyle: {
                        color: a.average >= 2.5 ? '#ef4444' : 
                                a.average >= 1.5 ? '#f59e0b' : '#10b981'
                    }
                }))
            }]
        });

        window.addEventListener('resize', () => chart.resize());
    }

    // Initialize
    var flatData = sampleOdqs;
    var averages = getAverages(flatData);
    
    $('#pathway_modal').on('shown.bs.modal', function () {

        analyze(flatData);
        createChart(averages);
    });
</script>

`;

export default function PatientVisitsAnalyzePatientOdqsPage() {
  return (
    <PageShell title="PatientVisits/analyze_patient_odqs.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
