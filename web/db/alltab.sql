CREATE TABLE [dbo].[TbUsers](
	[uID] [int] NOT NULL,
	[uFirstName] [nvarchar](50) NULL,
	[uLastName] [nvarchar](50) NULL,
	[uEmail] [nvarchar](50) NULL,
	[uPWD] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbUsers] PRIMARY KEY CLUSTERED 
(
	[uID] ASC
)
) 

CREATE TABLE [dbo].[TbTemplates](
	[tID] [int] NOT NULL,
	[tName] [nvarchar](50) NULL,
	[tDesc] [nvarchar](200) NULL,
 CONSTRAINT [PK_TbTemplates] PRIMARY KEY CLUSTERED ([tID] ASC)
)



CREATE TABLE [dbo].[TbPointOfInterest](
	[poiID] [int] NOT NULL,
	[poiTID] [int] NULL,
	[poiPlaceName] [varchar](50) NULL,
	[poiLong] [nvarchar](50) NULL,
	[poiLat] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbPointOfInterest] PRIMARY KEY CLUSTERED 
(
	[poiID] ASC
)
)


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
)
)
 

 CREATE TABLE [dbo].[TbLocation](
	[locID] [int] NOT NULL,
	[locATID] [int] NULL,
	[locPoint] [varchar](100) NULL,
 CONSTRAINT [PK_TbLocation] PRIMARY KEY CLUSTERED 
(
	[locID] ASC
)
)

CREATE TABLE [dbo].[TbActiveTrip](
	[atID] [int] NOT NULL,
	[atPTID] [int] NULL,
	[atUID] [int] NULL,
	[atAccepted] [bit] NOT NULL,
 CONSTRAINT [PK_TbActiveTrip] PRIMARY KEY CLUSTERED 
(
	[atID] ASC
)
)

QlAwUCX9hNp2vK4CBYRhtkSCCUNBgOITVKS9ZBd1fI38BHJQDgkGF91VNHr9M3k