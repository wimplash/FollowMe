USE [FollowMe]
GO

/****** Object:  Table [dbo].[TbPlannedTrip]    Script Date: 02/27/2014 17:11:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TbPlannedTrip](
	[ptID] [int] NOT NULL,
	[ptUID] [int] NULL,
	[ptActive] [bit] NULL,
	[ptStart] [datetime] NULL,
	[ptDesc] [nvarchar](200) NULL,
	[ptTID] [int] NULL,
 CONSTRAINT [PK_TbPlannedTrip] PRIMARY KEY CLUSTERED 
(
	[ptID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

