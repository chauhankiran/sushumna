CREATE TABLE "companies" (
    id BIGSERIAL PRIMARY KEY,

    name TEXT,
    email TEXT,
    phone TEXT,
    mobile TEXT,
    fax TEXT,
    website TEXT,

    "addressLine1" TEXT,
    "addressLine2" TEXT,
    city TEXT,
    "stateId" BIGINT,
    zip TEXT,
    "countryId" BIGINT,

    "statusId" BIGINT,
    "stageId" BIGINT,
    "sourceId" BIGINT,
    "employeeSize" INT,
    "annualRevenue" NUMERIC,
    "industryId" BIGINT,
    "typeId" BIGINT,
    "assigneeId" BIGINT,
    description TEXT,

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ,
    "createdBy" BIGINT,
    "updatedBy" BIGINT,

    "isActive" BOOLEAN NOT NULL DEFAULT TRUE
);