using System.Diagnostics.CodeAnalysis;

namespace MyWoServer.Models;

public class PaginationParams
{
    private const int MaxPageSize = 100;
    private int? _pageSize;

    public int? PageNumber { get; set; } = 1;

    public int? PageSize 
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }

    [MemberNotNullWhen(true, nameof(PageNumber), nameof(PageSize))]
    public bool IsPaginated => PageNumber.HasValue && PageSize.HasValue;
}
