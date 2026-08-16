namespace MyWoServer.Models.Interfaces;

public interface ISoftDeletable
{
    DateTime? DeletedAt { get; set; }
}
