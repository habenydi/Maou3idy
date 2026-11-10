import { Controller, Get, Header } from "@nestjs/common";
import { Public } from "../auth/decorator/public.decorator";
import { PrometheusService } from "./prometheus.service";

@Controller()
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get("metrics")
  @Public()
  @Header("Content-Type", "text/plain; version=0.0.4; charset=utf-8")
  @Header("Cache-Control", "no-store")
  getMetrics(): Promise<string> {
    return this.prometheusService.getMetrics();
  }
}