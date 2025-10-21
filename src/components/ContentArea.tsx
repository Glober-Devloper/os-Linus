import { Download, Lightbulb, Code, Eye } from 'lucide-react';
import { Topic } from '../types/content';

interface ContentAreaProps {
  topic: Topic;
}

export function ContentArea({ topic }: ContentAreaProps) {
  const handleDownloadPDF = () => {
    const element = document.getElementById('content-to-print');
    if (!element) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styles = `
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
        h1 { color: #1e40af; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
        h2 { color: #2563eb; margin-top: 20px; }
        .key-point { background: #eff6ff; padding: 10px; margin: 5px 0; border-left: 4px solid #3b82f6; }
        .example { background: #f8fafc; padding: 15px; margin: 15px 0; border: 1px solid #e2e8f0; }
        pre { background: #1e293b; color: #f1f5f9; padding: 15px; overflow-x: auto; }
        .visual { white-space: pre; font-family: monospace; background: #f1f5f9; padding: 15px; }
      </style>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${topic.title}</title>
          ${styles}
        </head>
        <body>
          ${element.innerHTML}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
            <button
              onClick={handleDownloadPDF}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-md"
            >
              <Download size={20} />
              Download as PDF
            </button>
          </div>

          <div id="content-to-print" className="p-6 lg:p-8">
            <div className="prose prose-slate max-w-none">
              <div className="text-lg text-slate-700 leading-relaxed mb-8">
                {topic.content}
              </div>

              {topic.keyPoints && topic.keyPoints.length > 0 && (
                <div className="my-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="text-amber-500" size={24} />
                    <h2 className="text-2xl font-bold text-slate-800">Key Points</h2>
                  </div>
                  <div className="space-y-3">
                    {topic.keyPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg hover:bg-blue-100 transition-colors"
                      >
                        <p className="text-slate-700 font-medium">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {topic.examples && topic.examples.length > 0 && (
                <div className="my-8 space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="text-green-600" size={24} />
                    <h2 className="text-2xl font-bold text-slate-800">Examples</h2>
                  </div>
                  {topic.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {example.title}
                      </h3>
                      <p className="text-slate-600 mb-4">{example.description}</p>

                      {example.code && (
                        <div className="mt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Code className="text-blue-600" size={18} />
                            <span className="text-sm font-semibold text-slate-700">
                              Code Example
                            </span>
                          </div>
                          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      )}

                      {example.visual && (
                        <div className="mt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="text-green-600" size={18} />
                            <span className="text-sm font-semibold text-slate-700">
                              Visual Representation
                            </span>
                          </div>
                          <pre className="bg-slate-100 text-slate-800 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-slate-300">
                            {example.visual}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-slate-600">
            <strong>Learning Tip:</strong> Take your time with each topic. Try to understand the
            concepts through the examples provided. Practice with the code examples in your own
            environment for better retention.
          </p>
        </div>
      </div>
    </main>
  );
}
