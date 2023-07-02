import { applyDecorators } from "@nestjs/common";
import { ApiForbiddenResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function ApiAccessDeniedResponse() {
  return applyDecorators(
    ApiForbiddenResponse({
      description: "You do not have permission to access this resource.",
    }),
    ApiUnauthorizedResponse({
      description: "Authentication is required to access this resource.",
    })
  );
}
