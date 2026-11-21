const { resourceFromAttributes } = require('@opentelemetry/resources');
const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const {
  ConsoleMetricExporter,
  PeriodicExportingMetricReader,
} = require('@opentelemetry/sdk-metrics');

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'todo-service',
  }),

  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
  }),

  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),

  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();