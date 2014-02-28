USE [FollowMe]
GO

/****** Object:  Table [dbo].[TbTemplates]    Script Date: 02/27/2014 17:27:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TbTemplates](
	[tID] [int] NOT NULL,
	[tName] [nvarchar](50) NULL,
	[tDesc] [nvarchar](200) NULL,
 CONSTRAINT [PK_TbTemplates] PRIMARY KEY CLUSTERED 
(
	[tID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

