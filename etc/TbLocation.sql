USE [FollowMe]
GO

/****** Object:  Table [dbo].[TbLocation]    Script Date: 02/27/2014 17:13:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TbLocation](
	[locID] [int] NOT NULL,
	[locATID] [int] NULL,
	[locPoint] [varchar](100) NULL,
 CONSTRAINT [PK_TbLocation] PRIMARY KEY CLUSTERED 
(
	[locID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

