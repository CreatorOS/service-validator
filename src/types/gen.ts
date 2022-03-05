/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/validate/grant-create": {
    post: operations["validateGrantCreate"];
  };
  "/validate/grant-update": {
    post: operations["validateGrantUpdate"];
  };
  "/validate/workspace-create": {
    post: operations["validateWorkspaceCreate"];
  };
  "/validate/workspace-update": {
    post: operations["validateWorkspaceUpdate"];
  };
  "/validate/workspace-public-keys-update": {
    post: operations["validateWorkspacePublicKeysUpdate"];
  };
  "/validate/grant-application-create": {
    post: operations["validateGrantApplicationCreate"];
  };
  "/validate/grant-application-update": {
    post: operations["validateGrantApplicationUpdate"];
  };
  "/validate/application-milestone-update": {
    post: operations["validateApplicationMilestoneUpdate"];
  };
}

export interface components {
  schemas: {
    Error: {
      statusCode: number;
      /** @description Specific description of the error */
      error: string;
      /** @description What the error was */
      message: string;
      /** @description Some extra information about the error */
      data?: { [key: string]: unknown };
    };
    /**
     * Format: hex
     * @example 0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658
     */
    Address: string;
    /**
     * Format: integer
     * @description Positive integer amount of currency. Is a string to allow bigint inputs
     */
    Amount: string;
    /** @description Chain ID of the network */
    SupportedNetwork: "1" | "4" | "137" | "80001" | "1666700000" | "1666600000";
    GrantField: {
      /** @description Human readable title of the field */
      title: string;
      inputType: "short-form" | "long-form" | "numeric" | "array";
      /** @description Constraint possible inputs for this field */
      enum?: string[];
      /** @description Whether this field is PII (personally identifiable information) or not */
      pii?: boolean;
    };
    GrantProposedMilestone: {
      title: string;
      amount: components["schemas"]["Amount"];
    };
    GrantApplicationFieldAnswer: components["schemas"]["GrantApplicationFieldAnswerItem"][];
    RequiredGrantApplicationFieldAnswer: components["schemas"]["GrantApplicationFieldAnswerItem"][];
    GrantApplicationFieldAnswerItem: {
      value: string;
      address?: components["schemas"]["Address"];
    };
    /** @description Maps ID of the field to the answer by the applicant */
    GrantApplicationFieldAnswers: {
      applicantName: components["schemas"]["RequiredGrantApplicationFieldAnswer"];
      applicantEmail: components["schemas"]["RequiredGrantApplicationFieldAnswer"];
      projectName: components["schemas"]["RequiredGrantApplicationFieldAnswer"];
      projectDetails: components["schemas"]["RequiredGrantApplicationFieldAnswer"];
      fundingBreakdown: components["schemas"]["RequiredGrantApplicationFieldAnswer"];
    } & { [key: string]: components["schemas"]["GrantApplicationFieldAnswer"] };
    GrantApplicationRequest: {
      grantId: string;
      applicantId: components["schemas"]["OwnerID"];
      fields: components["schemas"]["GrantApplicationFieldAnswers"];
      milestones: components["schemas"]["GrantProposedMilestone"][];
    };
    GrantApplicationUpdate: {
      fields?: components["schemas"]["GrantApplicationFieldAnswers"];
      milestones?: components["schemas"]["GrantProposedMilestone"][];
      feedback?: string;
    };
    SocialItem: {
      name: string;
      value: string;
    };
    WorkspaceCreateRequest: {
      title: string;
      about: string;
      /** @description IPFS hash of the logo of the workspace */
      logoIpfsHash: string;
      /** @description IPFS hash of the cover of the workspace */
      coverImageIpfsHash?: string;
      creatorId: components["schemas"]["OwnerID"];
      supportedNetworks: components["schemas"]["SupportedNetwork"][];
      socials: components["schemas"]["SocialItem"][];
      publicKeys?: components["schemas"]["PublicKeyMap"][];
    };
    /** @description The public encryption key associated with the account address */
    PublicKey: string;
    PublicKeyMap: {
      publicKey?: components["schemas"]["PublicKey"];
      address?: components["schemas"]["Address"];
    };
    WorkspacePublicKeysUpdateRequest: {
      publicKeys?: components["schemas"]["PublicKeyMap"][];
    };
    WorkspaceUpdateRequest: {
      title?: string;
      about?: string;
      /** @description IPFS hash of the logo of the workspace */
      logoIpfsHash?: string;
      /** @description IPFS hash of the cover of the workspace */
      coverImageIpfsHash?: string;
      socials?: components["schemas"]["SocialItem"][];
    };
    ApplicationMilestoneUpdate: {
      text: string;
    };
    GrantFieldMap: {
      applicantName: components["schemas"]["GrantField"];
      applicantEmail: components["schemas"]["GrantField"];
      projectName: components["schemas"]["GrantField"];
      projectDetails: components["schemas"]["GrantField"];
      fundingBreakdown: components["schemas"]["GrantField"];
    } & { [key: string]: components["schemas"]["GrantField"] };
    GrantReward: {
      committed: components["schemas"]["Amount"];
      asset: components["schemas"]["Address"];
    };
    GrantCreateRequest: {
      title: string;
      summary: string;
      details: string;
      /**
       * Format: date-time
       * @description Deadline of the application
       */
      deadline?: Date | string;
      reward: components["schemas"]["GrantReward"];
      creatorId: components["schemas"]["OwnerID"];
      /** @description the workspace the grant is from */
      workspaceId: string;
      fields: components["schemas"]["GrantFieldMap"];
    };
    GrantUpdateRequest: {
      title?: string;
      summary?: string;
      details?: string;
      /**
       * Format: date-time
       * @description Deadline of the application
       */
      deadline?: Date | string;
      reward?: components["schemas"]["GrantReward"];
      fields?: components["schemas"]["GrantFieldMap"];
    };
    /** @example 0x71C7656EC7ab88b098defB751B7411C5f6d8976F */
    OwnerID: string;
  };
  responses: {
    /** Validation was success, data pushed to IPFS & pinned */
    ValidationSuccessResponse: {
      content: {
        "application/json": {
          /**
           * @description IPFS hash of the uploaded grant
           * @example QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco
           */
          ipfsHash: string;
          /**
           * @description http url that can be used to fetch the uploaded grant file
           * @example https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco
           */
          url: string;
        };
      };
    };
    /** Generic error response */
    ErrorResponse: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
}

export interface operations {
  validateGrantCreate: {
    responses: {
      200: components["responses"]["ValidationSuccessResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["GrantCreateRequest"];
      };
    };
  };
  validateGrantUpdate: {
    responses: {
      200: components["responses"]["ValidationSuccessResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["GrantUpdateRequest"];
      };
    };
  };
  validateWorkspaceCreate: {
    responses: {
      200: components["responses"]["ValidationSuccessResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["WorkspaceCreateRequest"];
      };
    };
  };
  validateWorkspaceUpdate: {
    responses: {
      200: components["responses"]["ValidationSuccessResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["WorkspaceUpdateRequest"];
      };
    };
  };
  validateWorkspacePublicKeysUpdate: {
    responses: {
      200: components["responses"]["ValidationSuccessResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["WorkspacePublicKeysUpdateRequest"];
      };
    };
  };
  validateGrantApplicationCreate: {
    responses: {
      200: components["responses"]["ValidationSuccessResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["GrantApplicationRequest"];
      };
    };
  };
  validateGrantApplicationUpdate: {
    responses: {
      200: components["responses"]["ValidationSuccessResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["GrantApplicationUpdate"];
      };
    };
  };
  validateApplicationMilestoneUpdate: {
    responses: {
      200: components["responses"]["ValidationSuccessResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ApplicationMilestoneUpdate"];
      };
    };
  };
}

export interface external {}
