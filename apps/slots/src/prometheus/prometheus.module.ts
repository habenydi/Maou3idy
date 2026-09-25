import { Module } from "@nestjs/common";
import { PrometheusController } from "./prometheus.controller";
import { PrometheusInterceptor } from "./prometheus.interceptor";
import { PrometheusService } from "./prometheus.service";

@Module({
  controllers: [PrometheusController],
  providers: [PrometheusService, PrometheusInterceptor],
  exports: [PrometheusInterceptor, PrometheusService],
})
export class PrometheusModule {}
