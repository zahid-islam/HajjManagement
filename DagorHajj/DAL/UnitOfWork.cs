using System;
using DagorHajj.Models;
using DagorHajj.DAL.Repository;

namespace DagorHajj.DAL
{
    public class UnitOfWork : IDisposable
    {
        private readonly DagorHajjEntities _db = new DagorHajjEntities();

        // Common Shared DAL  Repository End
        private UserRepository _userRepository;
        private RoleRepository _roleRepository;
        //private UserBranchRepository _userBranchRepository;
        //private SelectValueRepository _selectValueRepository;
        //private CompanyInfoRepository _companyInfoRepository;
        //private UserEmployeeRepository _userEmployeeRepository; 
        // Common Shared DAL  Repository End

        private HajjiRepository _hajjiRepository;
        private UmrahRepository _umrahRepository;
        private GroupLeaderRepository _groupLeaderRepository;
        private CompanyProfileRepository _companyProfileRepository;
        private ContractRepository _contractRepository;
        private BookingRepository _bookingRepository;
        private PaymentRepository _paymentRepository;
        private SupplierPaymentRepository _supplierPaymentRepository;
        private TicketRepository _ticketRepository;
        private OtherRepository _otherRepository;
        private HajjiStatusRepository _hajjiStatusRepository;
        private UmrahStatusRepository _umrahStatusRepository;
        private MuharramRepository _muharramRepository;
        private SettingsRepository _settingsRepository;
        private TransactionTypeRepository _transactionTypeRepository;
        private SupplierRepository _supplierRepository;
        private AdminSystemUserRepository _adminSystemUserRepository;
        private AdminSystemUserDetailRepository _adminSystemUserDetailRepository;
        public AdminSystemUserRepository AdminSystemUserRepository
        {
            get { return _adminSystemUserRepository ?? (_adminSystemUserRepository = new AdminSystemUserRepository(_db)); }
        }
        public AdminSystemUserDetailRepository AdminSystemUserDetailRepository
        {
            get { return _adminSystemUserDetailRepository ?? (_adminSystemUserDetailRepository = new AdminSystemUserDetailRepository(_db)); }
        }
        
        private TicketSectorRepository _ticketSectorRepository;

        public TicketSectorRepository TicketSectorRepository

        {
            get { return _ticketSectorRepository ?? (_ticketSectorRepository = new TicketSectorRepository(_db)); }

        }
        public UserRepository UserRepository
        {
            get { return _userRepository ?? (_userRepository = new UserRepository(_db)); }
        }

        public RoleRepository RoleRepository
        {
            get { return _roleRepository ?? (_roleRepository = new RoleRepository(_db)); }
        }

        public HajjiRepository HajjiRepository
        {
            get { return _hajjiRepository ?? (_hajjiRepository = new HajjiRepository(_db)); }
        }
        public UmrahRepository UmrahRepository
        {
            get { return _umrahRepository ?? (_umrahRepository = new UmrahRepository(_db)); }
        }

        public GroupLeaderRepository GroupLeaderRepository
        {
            get { return _groupLeaderRepository ?? (_groupLeaderRepository = new GroupLeaderRepository(_db)); }
        }
        public CompanyProfileRepository CompanyProfileRepository
        {
            get { return _companyProfileRepository ?? (_companyProfileRepository = new CompanyProfileRepository(_db)); }
        }

        public ContractRepository ContractRepository
        {
            get { return _contractRepository ?? (_contractRepository = new ContractRepository(_db)); }
        }
        public BookingRepository BookingRepository
        {
            get { return _bookingRepository ?? (_bookingRepository = new BookingRepository(_db)); }
        }
        public PaymentRepository PaymentRepository
        {
            get { return _paymentRepository ?? (_paymentRepository = new PaymentRepository(_db)); }
        }
        public SupplierPaymentRepository SupplierPaymentRepository
        {
            get { return _supplierPaymentRepository ?? (_supplierPaymentRepository = new SupplierPaymentRepository(_db)); }
        }
        public TicketRepository TicketRepository
        {
            get { return _ticketRepository ?? (_ticketRepository = new TicketRepository(_db)); }
        }
        public OtherRepository OtherRepository
        {
            get { return _otherRepository ?? (_otherRepository = new OtherRepository(_db)); }
        }
        public HajjiStatusRepository HajjiStatusRepository
        {
            get { return _hajjiStatusRepository ?? (_hajjiStatusRepository = new HajjiStatusRepository(_db)); }
        }
        public UmrahStatusRepository UmrahStatusRepository
        {
            get { return _umrahStatusRepository ?? (_umrahStatusRepository = new UmrahStatusRepository(_db)); }
        }
        public MuharramRepository MuharramRepository
        {
            get { return _muharramRepository ?? (_muharramRepository = new MuharramRepository(_db)); }
        }
        public SettingsRepository SettingsRepository
        {
            get { return _settingsRepository ?? (_settingsRepository = new SettingsRepository(_db)); }
        }
        public TransactionTypeRepository TransactionTypeRepository
        {
            get { return _transactionTypeRepository ?? (_transactionTypeRepository = new TransactionTypeRepository(_db)); }
        }
        public SupplierRepository SupplierRepository
        {
            get { return _supplierRepository ?? (_supplierRepository = new SupplierRepository(_db)); }
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _db.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}