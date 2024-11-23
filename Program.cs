using NotificationAPI.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.MapHub<NotificationHub>("/notificationHub");

app.Run();
